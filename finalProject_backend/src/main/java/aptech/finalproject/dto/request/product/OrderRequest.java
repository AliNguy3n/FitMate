package aptech.finalproject.dto.request.product;

import aptech.finalproject.entity.auth.User;
import aptech.finalproject.entity.product.Payment;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {

    @NotNull(message = "Order date is required")
    private Instant orderDate;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be positive")
    private Integer totalAmount;

    @NotNull(message = "Status is required")
    private Boolean status;

    private String userId;


    private Long paymentId;
}
