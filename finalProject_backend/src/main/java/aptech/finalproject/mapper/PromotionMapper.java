package aptech.finalproject.mapper;

import aptech.finalproject.dto.request.product.PromotionRequest;
import aptech.finalproject.dto.response.product.PromotionResponse;
import aptech.finalproject.entity.product.Product;
import aptech.finalproject.entity.product.Promotion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper( componentModel = "spring")
public interface PromotionMapper {
    @Mapping(target = "products", source = "products", qualifiedByName = "mapProductListToIdList")
    PromotionResponse toPromotionResponse(Promotion promotion);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "products", ignore = true)
    Promotion toPromotion(PromotionRequest promotionRequest);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "products", ignore = true)
    void updatePromotion(@MappingTarget Promotion promotion, PromotionRequest promotionRequest);


    @Named("mapProductListToIdList")
    static List<Long> mapProductListToIdList(List<Product> products) {
        if (products == null) return null;
        return products.stream()
                .map(Product::getId)
                .collect(Collectors.toList());
    }
}
