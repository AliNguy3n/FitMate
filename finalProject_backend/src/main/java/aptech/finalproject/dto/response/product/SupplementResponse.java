package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Product;
import aptech.finalproject.entity.product.SCategory;
import lombok.*;

import java.util.List;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplementResponse {
    private Long id;

    private Integer size;

    private String ingredient;

    private Product product;

    private List<Long> scategories;
}
