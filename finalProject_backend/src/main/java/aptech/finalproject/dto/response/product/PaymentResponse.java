package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Order;
import aptech.finalproject.entity.product.PaymentMethod;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentResponse {
    private Long id;

    private String transactionCode;

    private Instant paymentDate;

    private Integer amount;

    private Boolean status;

    private Long order;

    private String paymentMethodName;
}
