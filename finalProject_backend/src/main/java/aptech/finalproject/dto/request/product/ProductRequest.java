package aptech.finalproject.dto.request.product;

import aptech.finalproject.entity.auth.FileMetadata;
import aptech.finalproject.entity.product.Equipment;
import aptech.finalproject.entity.product.Promotion;
import aptech.finalproject.entity.product.Supplement;
import aptech.finalproject.entity.product.Supplier;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductRequest {
    @NotBlank(message = "Product name is required")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than 0")
    private Double price;

    @NotNull(message = "Stock is required")
    @PositiveOrZero(message = "Stock cannot be negative")
    private Integer stock;

    @PositiveOrZero(message = "Rating must be zero or more")
    private Float rating;

    private MultipartFile image;

    private String type; // added

    private Long supplierId;
    private Long promotionId;
    private Long equipmentId;
    private Long supplementId;
}
