 package aptech.finalproject.service.productV2;

 import aptech.finalproject.dto.productV2.ProductCardDTO;
 import aptech.finalproject.dto.response.product.ECategoryResponse;
 import aptech.finalproject.dto.response.product.EquipmentResponse;
 import aptech.finalproject.dto.response.product.SCategoryResponse;
 import aptech.finalproject.dto.response.product.SupplementResponse;

 import java.util.List;


 public interface ProductV2Service {
     List<ProductCardDTO> getProductCards();

     List<ECategoryResponse> getECategories();

     List<SCategoryResponse> getSCategories();

     EquipmentResponse getEquipmentById(Long id);

     SupplementResponse getSupplementById(Long id);
 }
