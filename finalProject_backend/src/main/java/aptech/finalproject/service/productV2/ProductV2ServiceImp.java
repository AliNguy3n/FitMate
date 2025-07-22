package aptech.finalproject.service.productV2;

import aptech.finalproject.dto.productV2.ProductCardDTO;
import aptech.finalproject.dto.response.product.ECategoryResponse;
import aptech.finalproject.dto.response.product.SCategoryResponse;
import aptech.finalproject.dto.response.product.SupplierResponse;
import aptech.finalproject.entity.product.ECategory;
import aptech.finalproject.entity.product.SCategory;
import aptech.finalproject.mapper.ECategoryMapper;
import aptech.finalproject.mapper.SCategoryMapper;
import aptech.finalproject.repository.product.*;
import aptech.finalproject.service.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductV2ServiceImp implements ProductV2Service {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    SupplierRepository supplierRepository;

    @Autowired
    PromotionRepository promotionRepository;

    @Autowired
    EquipmentRepository equipmentRepository;

    @Autowired
    SupplementRepository supplementRepository;

    @Autowired
    ECategoryRepository eCategoryRepository;

    @Autowired
    SCategoryRepository sCategoryRepository;
    @Autowired
    private ECategoryMapper eCategoryMapper;
    @Autowired
    private SCategoryMapper sCategoryMapper;


    @Override
    public List<ProductCardDTO> getProductCards() {
        List<ProductCardDTO> productCardDTOs = new ArrayList<ProductCardDTO>();
        var products = productRepository.findAll();
        for (var product : products) {
            var productCardDTO = new ProductCardDTO();
            productCardDTO.setId(product.getId());
            productCardDTO.setName(product.getName());
            productCardDTO.setPrice(product.getPrice());
            productCardDTO.setRating(product.getRating());
            productCardDTO.setStock(product.getStock());
            productCardDTO.setType(product.getType());

            if (product.getImage() != null) {
                productCardDTO.setImage(product.getImage().getStoredName());
            }


            // discount & check Date
            if (product.getPromotion() != null) {
                productCardDTO.setDiscount(product.getPromotion().getDiscount());
            } else {
                productCardDTO.setDiscount(0f);
            }
            // categoryIds
            if ("equipment".equals(product.getType()) && product.getEquipment() != null) {
                var eId = product.getEquipment().getId();
                equipmentRepository.findById(eId).ifPresent(equipment -> {
                    List<Long> categoryIds = equipment.getCategory().stream()
                            .map(ECategory::getId)
                            .collect(Collectors.toList());
                    productCardDTO.setCategoryIds(categoryIds);
                });
            } else if ("supplement".equals(product.getType()) && product.getEquipment() != null) {
                var eId = product.getEquipment().getId();
                supplementRepository.findById(eId).ifPresent(supplement -> {
                    List<Long> categoryIds = supplement.getScategories().stream()
                            .map(SCategory::getId)
                            .collect(Collectors.toList());
                    productCardDTO.setCategoryIds(categoryIds);
                });
            }


            productCardDTOs.add(productCardDTO);
        }

        return productCardDTOs;
    }

    @Override
    public List<ECategoryResponse> getECategories() {
        return eCategoryRepository.findAll().stream()
                .map(eCategoryMapper::toECategoryResponse)
                .collect(Collectors.toList());
    }

    public List<SCategoryResponse> getSCategories() {
        return sCategoryRepository.findAll()
                .stream()
                .map(sCategoryMapper::toSCategoryResponse)
                .collect(Collectors.toList());
    }
}
