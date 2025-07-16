package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.PaymentMethodRequest;
import aptech.finalproject.dto.response.product.PaymentMethodResponse;

public interface PaymentMethodService {
    PaymentMethodResponse createPaymentMethod(PaymentMethodRequest paymentMethodRequest);

    PaymentMethodResponse updatePaymentMethod(Long id, PaymentMethodRequest paymentMethodRequest);

    void deletePaymentMethod(Long id);

    PaymentMethodResponse getPaymentMethod(Long id);
}
