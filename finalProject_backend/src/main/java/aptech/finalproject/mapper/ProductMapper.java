package aptech.finalproject.mapper;

import aptech.finalproject.dto.request.product.ProductRequest;
import aptech.finalproject.dto.response.product.ProductResponse;
import aptech.finalproject.entity.product.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper( componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    @Mapping(target = "promotion", ignore = true)
    @Mapping(target = "equipment", ignore = true)
    @Mapping(target = "supplement", ignore = true)
    @Mapping(target = "category", ignore = true)
    Product toProduct(ProductRequest productRequest);

    @Mapping(source = "image.storedName", target = "image")
    @Mapping(source = "supplier.id", target = "supplier")
    @Mapping(source = "promotion.id", target = "promotion")
    @Mapping(source = "equipment.id", target = "equipment")
    @Mapping(source = "supplement.id", target = "supplement")
    ProductResponse toProductResponse(Product product);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "supplier", ignore = true)
    @Mapping(target = "promotion", ignore = true)
    @Mapping(target = "equipment", ignore = true)
    @Mapping(target = "supplement", ignore = true)
    @Mapping(target = "category", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductRequest productRequest);
}
