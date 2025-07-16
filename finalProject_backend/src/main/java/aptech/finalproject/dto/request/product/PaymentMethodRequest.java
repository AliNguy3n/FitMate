package aptech.finalproject.dto.request.product;

import aptech.finalproject.entity.auth.FileMetadata;
import aptech.finalproject.entity.product.Payment;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentMethodRequest {

    @NotBlank(message = "Description is required")
    private String description;

    private Long imageId;
}
