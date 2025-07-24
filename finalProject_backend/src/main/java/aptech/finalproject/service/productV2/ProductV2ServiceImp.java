 package aptech.finalproject.service.productV2;

 import aptech.finalproject.dto.productV2.ProductCardDTO;
 import aptech.finalproject.dto.response.product.*;
 import aptech.finalproject.entity.product.*;
 import aptech.finalproject.exception.ApiException;
 import aptech.finalproject.exception.ErrorCode;
 import aptech.finalproject.mapper.ECategoryMapper;
 import aptech.finalproject.mapper.EquipmentMapper;
 import aptech.finalproject.mapper.SCategoryMapper;
 import aptech.finalproject.mapper.SupplementMapper;
 import aptech.finalproject.repository.product.*;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;

 import java.time.Instant;
 import java.util.ArrayList;
 import java.util.Comparator;
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
     @Autowired
     private EquipmentMapper equipmentMapper;
     @Autowired
     private SupplementMapper supplementMapper;


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
                 Promotion promotion = product.getPromotion();
                 Instant now = Instant.now();

                 if (promotion.getStartDate().isBefore(now) && promotion.getEndDate().isAfter(now)) {
                     productCardDTO.setDiscount(promotion.getDiscount());
                 } else {
                     productCardDTO.setDiscount(0f);
                 }
             } else {
                 productCardDTO.setDiscount(0f);
             }

             // categoryIds
             if ("equipment".equals(product.getType()) && product.getEquipment() != null) {
                 var eId = product.getEquipment().getId();
                 productCardDTO.setDetailId(eId);
                 equipmentRepository.findById(eId).ifPresent(equipment -> {
                     List<Long> categoryIds = equipment.getEcategories().stream()
                             .map(ECategory::getId)
                             .collect(Collectors.toList());
                     productCardDTO.setCategoryIds(categoryIds);
                 });
             } else if ("supplement".equals(product.getType()) && product.getSupplement() != null) {
                 var sId = product.getSupplement().getId();
                 productCardDTO.setDetailId(sId);
                 supplementRepository.findById(sId).ifPresent(supplement -> {
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

     public EquipmentResponse getEquipmentById(Long id) {
         Equipment equipment = equipmentRepository.findById(id)
                 .orElseThrow(() -> new ApiException(ErrorCode.EQUIPMENT_NOT_FOUND));
         return equipmentMapper.toEquipmentResponse(equipment);
     }

     public SupplementResponse getSupplementById(Long id) {
         Supplement supplement = supplementRepository.findById(id)
                 .orElseThrow(() -> new ApiException(ErrorCode.SUPPLEMENT_NOT_FOUND));
         return supplementMapper.toSupplementResponse(supplement);
     }

     // get best product and supplement
     @Override
     public List<ProductCardDTO> getProductTopCards(Long limit) {
         List<Product> products = productRepository.findAll();

         // Tách product theo loại và sort theo rating
         List<Product> topEquipments = products.stream()
                 .filter(p -> "equipment".equals(p.getType()))
                 .sorted(Comparator.comparing(Product::getRating).reversed())
                 .limit(limit)
                 .collect(Collectors.toList());

         List<Product> topSupplements = products.stream()
                 .filter(p -> "supplement".equals(p.getType()))
                 .sorted(Comparator.comparing(Product::getRating).reversed())
                 .limit(limit)
                 .collect(Collectors.toList());

         List<ProductCardDTO> result = new ArrayList<>();

         topEquipments.forEach(product -> result.add(toCardDTO(product)));
         topSupplements.forEach(product -> result.add(toCardDTO(product)));

         return result;
     }

     private ProductCardDTO toCardDTO(Product product) {
         ProductCardDTO dto = new ProductCardDTO();
         dto.setId(product.getId());
         dto.setName(product.getName());
         dto.setPrice(product.getPrice());
         dto.setRating(product.getRating());
         dto.setStock(product.getStock());
         dto.setType(product.getType());

         if (product.getImage() != null) {
             dto.setImage(product.getImage().getStoredName());
         }

         // Discount
         if (product.getPromotion() != null) {
             var promotion = product.getPromotion();
             Instant now = Instant.now();
             if (!promotion.getStartDate().isAfter(now) && !promotion.getEndDate().isBefore(now)) {
                 dto.setDiscount(promotion.getDiscount());
             } else {
                 dto.setDiscount(0f);
             }
         } else {
             dto.setDiscount(0f);
         }

         // Category & DetailId
         if ("equipment".equals(product.getType()) && product.getEquipment() != null) {
             var eId = product.getEquipment().getId();
             dto.setDetailId(eId);
             equipmentRepository.findById(eId).ifPresent(equipment -> {
                 List<Long> categoryIds = equipment.getEcategories().stream()
                         .map(ECategory::getId)
                         .collect(Collectors.toList());
                 dto.setCategoryIds(categoryIds);
             });
         }

         if ("supplement".equals(product.getType()) && product.getSupplement() != null) {
             var sId = product.getSupplement().getId();
             dto.setDetailId(sId);
             supplementRepository.findById(sId).ifPresent(supplement -> {
                 List<Long> categoryIds = supplement.getScategories().stream()
                         .map(SCategory::getId)
                         .collect(Collectors.toList());
                 dto.setCategoryIds(categoryIds);
             });
         }

         return dto;
     }


 }
