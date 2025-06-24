package aptech.finalproject.service;

import aptech.finalproject.emums.FileType;
import aptech.finalproject.entity.FileMetadata;
import aptech.finalproject.exception.ApiException;
import aptech.finalproject.exception.ErrorCode;
import aptech.finalproject.repository.FileMetadataRepository;
import aptech.finalproject.security.config.AppPathProperties;
import aptech.finalproject.util.FileTypeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    @Autowired
    FileMetadataRepository fileMetadataRepository;

    @Autowired
    AppPathProperties appPath;

    public FileMetadata saveImage(MultipartFile file) throws ApiException {
        if (file.isEmpty())
            throw new ApiException(ErrorCode.FILE_IS_EMPTY);

        if (file.getOriginalFilename() == null || file.getOriginalFilename().isEmpty())
            throw new ApiException(ErrorCode.NOT_SUPPORTED_FILE_TYPE);

        FileType fileType = FileTypeUtil.detectFileType(file);
        List<String> extension = fileType.getExtension();
        String storedName = UUID.randomUUID().toString() + "." + extension.getFirst();

        Path fileDir = appPath.getImagesPath().resolve(fileType.getTypeName());

        try {
            Files.createDirectories(fileDir);
            Path path = fileDir.resolve(storedName);
            file.transferTo(path.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }

        FileMetadata fileMetadata = FileMetadata.builder()
                .id(UUID.randomUUID().toString())
                .originalName(file.getOriginalFilename())
                .storedName(storedName)
                .fileType(fileType)
                .size(file.getSize())
                .uploadAt(Instant.now())
                .build();
        return fileMetadataRepository.save(fileMetadata);
    }

//    public byte[] getFileContent(String storedName) throws ApiException {
//        FileMetadata fileMetadata = fileMetadataRepository.findByStoredName(storedName)
//                .orElseThrow(() -> new ApiException(ErrorCode.FILE_NOT_FOUND));
//        try {
//
//        }
//    }

    public void deleteImage(String storedName) {
        FileMetadata fileMetadata = fileMetadataRepository.findByStoredName(storedName)
                .orElseThrow(() -> new ApiException(ErrorCode.FILE_NOT_FOUND));

        try {
            Path filePath = appPath.getImagesPath()
                    .resolve(fileMetadata.getFileType().getTypeName())
                    .resolve(storedName);

            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file", e);
        }

    }


    private FileMetadata findById(String id) {
        return fileMetadataRepository.findById(id).orElseThrow(() -> new ApiException(ErrorCode.FILE_NOT_FOUND));
    }

    private FileMetadata findByFileName(String fileName) {
        return fileMetadataRepository.findByStoredName(fileName).orElseThrow(() -> new ApiException(ErrorCode.FILE_NOT_FOUND));
    }


}
