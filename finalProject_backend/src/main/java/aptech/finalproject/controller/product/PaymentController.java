package aptech.finalproject.controller.product;

import aptech.finalproject.dto.request.product.PaymentRequest;
import aptech.finalproject.dto.response.ApiResponse;
import aptech.finalproject.dto.response.product.PaymentResponse;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.service.product.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ApiResponse<PaymentResponse> create(@RequestBody @Valid PaymentRequest request,
                                               BindingResult result) {
        if (result.hasErrors()) {
            return ApiResponse.badRequest(result);
        }
        PaymentResponse created = paymentService.createPayment(request);
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
}
