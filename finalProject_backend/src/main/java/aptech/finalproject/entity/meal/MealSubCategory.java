package aptech.finalproject.entity.meal;

import aptech.finalproject.entity.FileMetadata;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MealSubCategory {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "image_id")
    private FileMetadata image;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "category_id")
    private MealCategory category;

    private String description;

    @OneToMany(mappedBy = "subCategory")
    private List<Meal> meals;

}
