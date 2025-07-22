package aptech.finalproject.dto.request.product;

import aptech.finalproject.entity.auth.FileMetadata;
import aptech.finalproject.entity.product.Product;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SupplierRequest {

//    @NotBlank(message = "Supplier type is required") // removed
//    private String type;

    @NotBlank(message = "Supplier name is required")
    private String name;

    @NotBlank(message = "Contact info is required")
    private String contact;

    @NotBlank(message = "Address is required")
    private String address;

    private MultipartFile image;
}
