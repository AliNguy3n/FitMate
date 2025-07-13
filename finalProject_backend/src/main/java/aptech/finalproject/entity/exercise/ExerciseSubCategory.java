package aptech.finalproject.entity.exercise;

import aptech.finalproject.entity.FileMetadata;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseSubCategory {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne( cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "image")
    private FileMetadata image;

    private String description;

    @OneToMany(mappedBy = "subCategory")
    private List<ExerciseFavorite> favorites;

    @OneToMany( mappedBy = "subCategory")
    private List<Exercise> exercises;

    @ManyToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "mode_id")
    private ExerciseMode mode;

    @ManyToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn( name = "category_id")
    private ExerciseCategory category;
}
