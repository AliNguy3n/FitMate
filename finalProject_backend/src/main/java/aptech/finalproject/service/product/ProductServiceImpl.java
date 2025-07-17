package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.ProductRequest;
import aptech.finalproject.dto.response.product.ProductResponse;
import aptech.finalproject.entity.auth.FileMetadata;
import aptech.finalproject.entity.auth.User;
import aptech.finalproject.entity.product.*;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.ProductMapper;
import aptech.finalproject.repository.FileMetadataRepository;
import aptech.finalproject.repository.product.*;
import aptech.finalproject.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private SupplementRepository supplementRepository;
    @Autowired
    private FileService fileService;

    @PreAuthorize("hasAuthority('MANAGE_PRODUCTS')")
    public ProductResponse createProduct(ProductRequest productRequest) {
        Product product = productMapper.toProduct(productRequest);

        if (productRequest.getImage() != null && !productRequest.getImage().isEmpty()) {
            FileMetadata image = fileService.saveFile(productRequest.getImage(), Optional.of("product"));
            product.setImage(image);
        }

        if (productRequest.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(productRequest.getSupplierId())
                    .orElseThrow(() -> new ApiException(ErrorCode.SUPPLIER_NOT_FOUND));
            product.setSupplier(supplier);
        }

        if (productRequest.getPromotionId() != null) {
            Promotion promotion = promotionRepository.findById(productRequest.getPromotionId())
                    .orElseThrow(() -> new ApiException(ErrorCode.PROMOTION_NOT_FOUND));
            product.setPromotion(promotion);
        }

        if (productRequest.getEquipmentId() != null) {
            Equipment equipment = equipmentRepository.findById(productRequest.getEquipmentId())
                    .orElseThrow(() -> new ApiException(ErrorCode.EQUIPMENT_NOT_FOUND));
            product.setEquipment(equipment);
        }

        if (productRequest.getSupplementId() != null) {
            Supplement supplement = supplementRepository.findById(productRequest.getSupplementId())
                    .orElseThrow(() -> new ApiException(ErrorCode.SUPPLEMENT_NOT_FOUND));
            product.setSupplement(supplement);
        }

        return productMapper.toProductResponse(productRepository.save(product));
    }

    @PreAuthorize("hasAuthority('MANAGE_PRODUCTS')")
    public ProductResponse updateProduct(Long productId, ProductRequest productRequest) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));

        productMapper.updateProduct(product, productRequest);

        if (productRequest.getImage() != null && !productRequest.getImage().isEmpty()) {
            FileMetadata image = fileService.saveFile(productRequest.getImage(), Optional.of("product"));
            product.setImage(image);
        }

        if (productRequest.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(productRequest.getSupplierId())
                    .orElseThrow(() -> new ApiException(ErrorCode.SUPPLIER_NOT_FOUND));
            product.setSupplier(supplier);
        }

        if (productRequest.getPromotionId() != null) {
            Promotion promotion = promotionRepository.findById(productRequest.getPromotionId())
                    .orElseThrow(() -> new ApiException(ErrorCode.PROMOTION_NOT_FOUND));
            product.setPromotion(promotion);
        }

        if (productRequest.getEquipmentId() != null) {
            Equipment equipment = equipmentRepository.findById(productRequest.getEquipmentId())
                    .orElseThrow(() -> new ApiException(ErrorCode.EQUIPMENT_NOT_FOUND));
            product.setEquipment(equipment);
        }

        if (productRequest.getSupplementId() != null) {
            Supplement supplement = supplementRepository.findById(productRequest.getSupplementId())
                    .orElseThrow(() -> new ApiException(ErrorCode.SUPPLEMENT_NOT_FOUND));
            product.setSupplement(supplement);
        }

        return productMapper.toProductResponse(productRepository.save(product));
    }

    @PreAuthorize("hasAuthority('MANAGE_PRODUCTS')")
    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new ApiException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        productRepository.deleteById(productId);
    }

    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ApiException(ErrorCode.PRODUCT_NOT_FOUND));
        return productMapper.toProductResponse(product);
    }

    public List<ProductResponse> getProductsByName(String productName) {
        return productRepository.findByNameLike(productName)
                .stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsBySupplier(Supplier supplier) {
        return productRepository.findBySupplier(supplier)
                .stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByPromotion(Promotion promotion) {
        return productRepository.findByPromotion(promotion)
                .stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByEquipment(Equipment equipment) {
        return productRepository.findByEquipment(equipment)
                .stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsBySupplement(Supplement supplement) {
        return productRepository.findBySupplement(supplement)
                .stream()
                .map(productMapper::toProductResponse)
                .collect(Collectors.toList());
    }

}
