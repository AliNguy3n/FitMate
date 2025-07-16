package aptech.finalproject.service.product;

import aptech.finalproject.dto.request.product.ECategoryRequest;
import aptech.finalproject.dto.response.product.ECategoryResponse;
import aptech.finalproject.entity.auth.FileMetadata;
import aptech.finalproject.entity.product.ECategory;
import aptech.finalproject.entity.product.Equipment;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.mapper.ECategoryMapper;
import aptech.finalproject.repository.product.ECategoryRepository;
import aptech.finalproject.repository.product.EquipmentRepository;
import aptech.finalproject.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ECategoryServiceImpl {
    @Autowired
    private ECategoryRepository eCategoryRepository;

    @Autowired
    private ECategoryMapper eCategoryMapper;

    @Autowired
    private FileService fileService;

    @Autowired
    private EquipmentRepository equipmentRepository;

    public ECategoryResponse toECategoryResponse(ECategoryRequest eCategoryRequest) {
        ECategory eCategory = eCategoryMapper.toECategory(eCategoryRequest);

        if (eCategoryRequest.getImage() != null && !eCategoryRequest.getImage().isEmpty()) {
            FileMetadata image = fileService.saveFile(eCategoryRequest.getImage(), Optional.of("ecategory"));
            eCategory.setImage(image);
        }

        if (eCategoryRequest.getEquipmentIds() != null && !eCategoryRequest.getEquipmentIds().isEmpty()) {
            List<Equipment> equipmentList = equipmentRepository.findAllById(eCategoryRequest.getEquipmentIds());
            eCategory.setEquipment(equipmentList);
        }

        return eCategoryMapper.toECategoryResponse(eCategoryRepository.save(eCategory));
    }

    public ECategoryResponse updateECategory(Long id, ECategoryRequest eCategoryRequest) {
        ECategory eCategory = eCategoryRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.ECategory_NOT_FOUND));

        eCategoryMapper.updateECategory(eCategory, eCategoryRequest);

        if (eCategoryRequest.getImage() != null && !eCategoryRequest.getImage().isEmpty()) {
            FileMetadata image = fileService.saveFile(eCategoryRequest.getImage(), Optional.of("ecategory"));
            eCategory.setImage(image);
        }

        if (eCategoryRequest.getEquipmentIds() != null) {
            List<Equipment> equipmentList = equipmentRepository.findAllById(eCategoryRequest.getEquipmentIds());
            eCategory.setEquipment(equipmentList);
        }

        return eCategoryMapper.toECategoryResponse(eCategoryRepository.save(eCategory));
    }

    public void deleteECategory(Long id) {
        if (!eCategoryRepository.existsById(id)) {
            throw new ApiException(ErrorCode.ECategory_NOT_FOUND);
        }
        eCategoryRepository.deleteById(id);
    }

    public List<ECategoryResponse> getAllCategories() {
        return eCategoryRepository.findAll().stream()
                .map(eCategoryMapper::toECategoryResponse)
                .collect(Collectors.toList());
    }

    public ECategoryResponse getCategoryById(Long id) {
        ECategory eCategory = eCategoryRepository.findById(id)
                .orElseThrow(() -> new ApiException(ErrorCode.ECategory_NOT_FOUND));
        return eCategoryMapper.toECategoryResponse(eCategory);
    }
}
