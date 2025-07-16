package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Product;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierResponse {
    private Long id;

    private String type;

    private String name;

    private String contact;

    private String address;

    private String image;

    private List<Long> products;
}
