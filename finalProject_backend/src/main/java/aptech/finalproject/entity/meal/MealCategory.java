package aptech.finalproject.entity.meal;

import aptech.finalproject.entity.FileMetadata;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "MealCategory")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MealCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "image")
    private FileMetadata image;

    @OneToMany(mappedBy = "category", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<MealSubCategory> subCategories;
}
