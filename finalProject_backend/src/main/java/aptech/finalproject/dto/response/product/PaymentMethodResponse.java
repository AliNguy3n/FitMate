package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Payment;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentMethodResponse {
    private Long id;

    private String description;

    private String image;

}
