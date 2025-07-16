package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.PaymentMethodRequest;
import aptech.finalproject.dto.request.product.PaymentRequest;
import aptech.finalproject.dto.response.product.PaymentMethodResponse;
import aptech.finalproject.dto.response.product.PaymentResponse;
import aptech.finalproject.entity.auth.FileMetadata;
import aptech.finalproject.entity.product.PaymentMethod;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.PaymentMapper;
import aptech.finalproject.mapper.PaymentMethodMapper;
import aptech.finalproject.repository.product.PaymentMethodRepository;
import aptech.finalproject.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private PaymentMethodMapper paymentMethodMapper;

    @Autowired
    private FileService fileService;

    public PaymentMethodResponse createPaymentMethod(PaymentMethodRequest paymentMethodRequest) {
        PaymentMethod paymentMethod = paymentMethodMapper.toPaymentMethod(paymentMethodRequest);

        if (paymentMethodRequest.getImageId() != null) {
            FileMetadata image = fileService.findById(paymentMethodRequest.getImageId().toString());
            paymentMethod.setImage(image);
        }

        return paymentMethodMapper.toPaymentMethodResponse(paymentMethodRepository.save(paymentMethod));
    }

    public PaymentMethodResponse updatePaymentMethod(Long id, PaymentMethodRequest paymentMethodRequest) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));

        paymentMethodMapper.updatePaymentMethod(paymentMethod, paymentMethodRequest);

        if (paymentMethodRequest.getImageId() != null) {
            FileMetadata image = fileService.findById(paymentMethodRequest.getImageId().toString());
            paymentMethod.setImage(image);
        }

        return paymentMethodMapper.toPaymentMethodResponse(paymentMethodRepository.save(paymentMethod));
    }

    public void deletePaymentMethod(Long id) {
        if (!paymentMethodRepository.existsById(id)) {
            throw new ApiException(ErrorCode.PAYMENT_METHOD_NOT_FOUND);
        }
        paymentMethodRepository.deleteById(id);
    }

    public PaymentMethodResponse getPaymentMethod(Long id) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.PAYMENT_METHOD_NOT_FOUND));
        return paymentMethodMapper.toPaymentMethodResponse(paymentMethod);
    }
}
