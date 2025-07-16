package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Supplement;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SCategoryResponse {
    private Long id;

    private String  name;

    private String description;

    private List<Long> supplements;
}
