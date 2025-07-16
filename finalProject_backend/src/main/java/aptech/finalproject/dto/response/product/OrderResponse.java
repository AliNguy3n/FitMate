package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.auth.User;
import aptech.finalproject.entity.product.Payment;
import lombok.*;

import java.time.Instant;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    private Long id;

    private Instant orderDate;

    private Integer totalAmount;

    private Boolean status;

    private Long user;

    private Long payment;
}
