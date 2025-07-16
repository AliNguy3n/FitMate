package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.auth.User;
import aptech.finalproject.entity.product.Payment;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailResponse {
    private Long id;

    private Integer quantity;

    private Double unitPrice;

    private Double subTotal;
}
