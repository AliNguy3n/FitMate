package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.PaymentRequest;
import aptech.finalproject.dto.response.product.PaymentResponse;
import aptech.finalproject.entity.product.Order;
import aptech.finalproject.entity.product.Payment;
import aptech.finalproject.entity.product.PaymentMethod;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.PaymentMapper;
import aptech.finalproject.repository.product.OrderRepository;
import aptech.finalproject.repository.product.PaymentMethodRepository;
import aptech.finalproject.repository.product.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService{
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentMapper paymentMapper;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    public PaymentResponse createPayment(PaymentRequest paymentRequest) {
        Payment payment = paymentMapper.toPayment(paymentRequest);

        Order order = orderRepository.findById(paymentRequest.getOrderId())
                .orElseThrow(() -> new ApiException(ErrorCode.ORDER_NOT_FOUND));
        payment.setOrder(order);

        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentRequest.getPaymentMethodId())
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));
        payment.setPaymentMethod(paymentMethod);

        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    public PaymentResponse updatePayment(Long id, PaymentRequest paymentRequest) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_NOT_FOUND));

        paymentMapper.updatePayment(payment, paymentRequest);

        Order order = orderRepository.findById(paymentRequest.getOrderId())
                .orElseThrow(() -> new ApiException(ErrorCode.ORDER_NOT_FOUND));
        payment.setOrder(order);

        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentRequest.getPaymentMethodId())
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));
        payment.setPaymentMethod(paymentMethod);

        return paymentMapper.toPaymentResponse(paymentRepository.save(payment));
    }

    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new ApiException(ErrorCode.PAYMENT_NOT_FOUND);
        }
        paymentRepository.deleteById(id);
    }

    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_NOT_FOUND));
        return paymentMapper.toPaymentResponse(payment);
    }

    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(paymentMapper::toPaymentResponse)
                .collect(Collectors.toList());
    }

    public List<PaymentResponse> getPaymentsByDate(Instant fromDate, Instant toDate) {
        return paymentRepository.findByPaymentDateBetween(fromDate, toDate)
                .stream()
                .map(paymentMapper::toPaymentResponse)
                .collect(Collectors.toList());
    }

    public PaymentResponse getPaymentByTransactionCode(String transactionCode) {
        Payment payment = paymentRepository.findByTransactionCode(transactionCode);
        if (payment == null) {
            throw new ApiException(ErrorCode.PAYMENT_NOT_FOUND);
        }
        return paymentMapper.toPaymentResponse(payment);
    }
}
