package aptech.finalproject.dto.response.product;

import aptech.finalproject.entity.product.Equipment;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ECategoryResponse {
    private Long id;

    private String name;

    private String image;

    private String description;

    private List<Long> equipment;
}
