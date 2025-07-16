package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Equipment;
import aptech.finalproject.entity.product.Promotion;
import aptech.finalproject.entity.product.Supplement;
import aptech.finalproject.entity.product.Supplier;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Long id;

    private String name;

    private String description;

    private Double price;

    private Integer stock;

    private Float rating;

    private String image;

    private Long supplier;

    private Long promotion;

    private Long equipment;

    private Long supplement;
}
