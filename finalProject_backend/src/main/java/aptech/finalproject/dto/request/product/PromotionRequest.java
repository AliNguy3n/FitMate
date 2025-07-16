package aptech.finalproject.dto.request.product;

import aptech.finalproject.entity.product.Product;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionRequest {
    @NotBlank(message = "Promotion name is required")
    private String name;

    @NotNull(message = "Discount is required")
    @PositiveOrZero(message = "Discount must be zero or more")
    private Float discount;

    @NotNull(message = "Start date is required")
    private Instant startDate;

    @NotNull(message = "End date is required")
    private Instant endDate;

    private List<Long> productIds;
}
