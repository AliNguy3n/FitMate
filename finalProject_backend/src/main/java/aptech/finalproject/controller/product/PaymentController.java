package aptech.finalproject.controller.product;

import aptech.finalproject.dto.request.product.PaymentRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.dto.response.product.PaymentResponse;
import aptech.finalproject.entity.product.Order;
import aptech.finalproject.entity.product.PaymentMethod;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.repository.product.OrderRepository;
import aptech.finalproject.repository.product.PaymentMethodRepository;
import aptech.finalproject.repository.product.PaymentRepository;
import aptech.finalproject.service.paypal.PayPalService;
import aptech.finalproject.service.product.PaymentService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final PayPalService payPalService;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final PaymentMethodRepository paymentMethodRepository;

    @Value("${paypal.successUrl}")
    private String successUrl;

    @Value("${paypal.cancelUrl}")
    private String cancelUrl;

    @PostMapping("/create")
    public ApiResponse<PaymentResponse> create(@RequestBody @Valid PaymentRequest request,
                                               BindingResult result) {
        if (result.hasErrors()) {
            return ApiResponse.badRequest(result);
        }
        PaymentResponse created = paymentService.createPayment(request);
        // why not update paymentId to order ?
        paymentService.updatePaymentToOrder(request.getOrderId(), created.getId());
        return ApiResponse.created(created, "Created Payment");
    }

    @GetMapping()
    public ApiResponse<List<PaymentResponse>> getAll() {
        List<PaymentResponse> list = paymentService.getAllPayments();
        if (list.isEmpty()) {
            return ApiResponse.notFound(ErrorCode.PAYMENT_NOT_FOUND.getException());
        }
        return ApiResponse.ok(list, "Get all Payments");
    }

    @GetMapping("/{id}")
    public ApiResponse<PaymentResponse> getById(@PathVariable Long id) {
        PaymentResponse response = paymentService.getPaymentById(id);
        return ApiResponse.ok(response, "Get Payment by ID");
    }

    @GetMapping("/transaction")
    public ApiResponse<PaymentResponse> getByTransactionCode(@RequestParam String code) {
        PaymentResponse response = paymentService.getPaymentByTransactionCode(code);
        return ApiResponse.ok(response, "Get Payment by Transaction Code");
    }

    @GetMapping("/filter")
    public ApiResponse<List<PaymentResponse>> getByDate(@RequestParam Instant from,
                                                        @RequestParam Instant to) {
        List<PaymentResponse> list = paymentService.getPaymentsByDate(from, to);
        if (list.isEmpty()) {
            return ApiResponse.notFound(ErrorCode.PAYMENT_NOT_FOUND.getException());
        }
        return ApiResponse.ok(list, "Get Payments by Date Range");
    }

    @PutMapping("/{id}")
    public ApiResponse<PaymentResponse> update(@PathVariable Long id,
                                               @RequestBody @Valid PaymentRequest request,
                                               BindingResult result) {
        if (result.hasErrors()) {
            return ApiResponse.badRequest(result);
        }
        PaymentResponse updated = paymentService.updatePayment(id, request);
        return ApiResponse.ok(updated, "Updated Payment");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ApiResponse.noContent("Deleted Payment with id: " + id);
    }

    @PostMapping("/paypal")
    public ResponseEntity<?> paymentWithPayPal(@RequestParam Double amount) {
        try {
            Payment payment = payPalService.createPayment(
                    amount,
                    "USD",
                    "paypal",
                    "sale",
                    "Payment for order",
                    cancelUrl,
                    successUrl
            );

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    System.out.println("Redirecting to PayPal approval URL: " + link.getHref());
                    return ResponseEntity.status(302).header("Location", link.getHref()).build();
                }
            }
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to process payment");
    }

    @GetMapping("/paypal/success")
    public ResponseEntity<?> success(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("payerID") String payerId,
            @RequestParam("orderId") Long orderId
    ) {
        try {
            com.paypal.api.payments.Payment executedPayment =
                    payPalService.executePayment(paymentId, payerId);

            if ("approved".equalsIgnoreCase(executedPayment.getState())) {

                Transaction transaction = executedPayment.getTransactions().get(0);
                Amount amount = transaction.getAmount();

                Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new RuntimeException("Order không tồn tại"));

                PaymentMethod method = paymentMethodRepository.findByNameIgnoreCase("paypal")
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy phương thức 'paypal'"));

                // Tạo Payment entity để lưu vào DB
                aptech.finalproject.entity.product.Payment paymentEntity =
                        aptech.finalproject.entity.product.Payment.builder()
                                .transactionCode(executedPayment.getId())
                                .paymentDate(Instant.now())
                                .amount((int) (Double.parseDouble(amount.getTotal()) * 100))
                                .status(true)
                                .currency(amount.getCurrency())
                                .order(order)
                                .paymentMethod(method)
                                .build();

                paymentRepository.save(paymentEntity);

                return ResponseEntity.ok("Thanh toán PayPal thành công và đã lưu vào database.");
            }

            return ResponseEntity.status(400).body("Thanh toán không được phê duyệt.");

        } catch (PayPalRESTException e) {
            return ResponseEntity.status(500).body("Lỗi xử lý thanh toán: " + e.getMessage());
        }
    }

    @PostMapping("/refund")
    public ResponseEntity<?> refund(@RequestParam String saleId, @RequestParam double amount) {
        try {
            Refund refund = payPalService.refundSale(saleId, amount, "USD");
            return ResponseEntity.ok(refund);
        } catch (PayPalRESTException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getDetails());
        }
    }

    @GetMapping("/paypal/cancel")
    public String cancel() {
        return "Payment canceled.";
    }
}
