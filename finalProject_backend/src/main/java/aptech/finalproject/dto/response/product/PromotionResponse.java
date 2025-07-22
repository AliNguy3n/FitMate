package aptech.finalproject.dto.response.product;


import lombok.*;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionResponse {
    private Long id;

    private String name;

    private Float discount;

    private Instant startDate;

    private Instant endDate;

    private List<Long> products;
}
