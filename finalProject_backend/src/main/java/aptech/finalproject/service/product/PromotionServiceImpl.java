package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.PromotionRequest;
import aptech.finalproject.dto.response.product.PromotionResponse;
import aptech.finalproject.entity.product.Product;
import aptech.finalproject.entity.product.Promotion;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.PromotionMapper;
import aptech.finalproject.repository.product.ProductRepository;
import aptech.finalproject.repository.product.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PromotionMapper promotionMapper;

    @Autowired
    private ProductRepository productRepository;

    @PreAuthorize("hasAuthority('MANAGE_PRODUCTS')")
    public PromotionResponse createPromotion(PromotionRequest promotionRequest) {
        Promotion promotion = promotionMapper.toPromotion(promotionRequest);

        if (promotionRequest.getProductIds() != null && !promotionRequest.getProductIds().isEmpty()) {
            List<Product> products = productRepository.findAllById(promotionRequest.getProductIds());
            promotion.setProducts(products);
        }

        return promotionMapper.toPromotionResponse(promotionRepository.save(promotion));
    }

    @PreAuthorize("hasAuthority('MANAGE_PRODUCTS')")
    public PromotionResponse updatePromotion(Long id, PromotionRequest promotionRequest) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.PROMOTION_NOT_FOUND));

        promotionMapper.updatePromotion(promotion, promotionRequest);

        if (promotionRequest.getProductIds() != null) {
            List<Product> products = productRepository.findAllById(promotionRequest.getProductIds());
            promotion.setProducts(products);
        }

        return promotionMapper.toPromotionResponse(promotionRepository.save(promotion));
    }

    @PreAuthorize("hasAuthority('MANAGE_PRODUCTS')")
    public void deletePromotion(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new ApiException(ErrorCode.PROMOTION_NOT_FOUND);
        }
        promotionRepository.deleteById(id);
    }

    public PromotionResponse getPromotionById(Long id) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.PROMOTION_NOT_FOUND));
        return promotionMapper.toPromotionResponse(promotion);
    }

    public List<PromotionResponse> getAllPromotions() {
        return promotionRepository.findAll()
                .stream()
                .map(promotionMapper::toPromotionResponse)
                .collect(Collectors.toList());
    }

    public List<PromotionResponse> getPromotionsByName(String name) {
        return promotionRepository.findByNameLike(name)
                .stream()
                .map(promotionMapper::toPromotionResponse)
                .collect(Collectors.toList());
    }
}
