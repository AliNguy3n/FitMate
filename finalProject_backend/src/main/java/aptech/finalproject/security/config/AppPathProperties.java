package aptech.finalproject.security.config;

import aptech.finalproject.emums.FileType;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@ConfigurationProperties(prefix = "app.config.paths")
@Data
public class AppPathProperties {

    private String staticDir = "static";
    private String imagesDir = "images";
    private String avatarsDir = "avatars";
    private String logosDir = "logos";
    private String articlesDir = "articles";
    private String commonImagesDir = "common";
    private String categoriesDir = "categories";
    private String pdfsDir = "pdfs";
    private String videosDir = "videos";
    private String docsDir = "docs";
    private String audiosDir = "audios";

    private final Path uploadDir = Paths.get(System.getProperty("user.dir"));


    private Path getStaticPath() {
        return uploadDir.resolve(Paths.get(staticDir));
    }

    private Path getCommonImagesPath() {
        return getStaticPath().resolve(Paths.get(commonImagesDir));
    }

    public Path getImagesPath() {
        return getStaticPath().resolve(Paths.get(imagesDir));
    }

    public Path getAvatarsPath() {
        return getCommonImagesPath().resolve(Paths.get(avatarsDir));
    }

    public Path getLogosPath() {
        return getCommonImagesPath().resolve(Paths.get(logosDir));
    }

    public Path getArticlesPath() {
        return getCommonImagesPath().resolve(Paths.get(articlesDir));
    }


    public Path getCategoriesPath() {
        return getCommonImagesPath().resolve(Paths.get(categoriesDir));
    }

    public Path getPdfsPath() {
        return getStaticPath().resolve(Paths.get(pdfsDir));
    }

    public Path getVideosPath() {
        return getStaticPath().resolve(Paths.get(videosDir));
    }

    public Path getDocsPath() {
        return getStaticPath().resolve(Paths.get(docsDir));
    }

    public Path getAudiosPath() {
        return getStaticPath().resolve(Paths.get(audiosDir));
    }

    public Path getPathByFileType(FileType fileType) {
        return
                switch (fileType.getTypeName()) {
                    case "image" -> getCommonImagesPath();
                    case "video" -> getVideosPath();
                    case "doc" -> getDocsPath();
                    case "audio" -> getAudiosPath();
                    case "pdf" -> getPdfsPath();
                    case "logo" -> getLogosPath();
                    case "article" -> getArticlesPath();
                    case "avatar" -> getAvatarsPath();
                    default -> throw new RuntimeException("Unsupported file type: " + fileType);
                };

    }
}
