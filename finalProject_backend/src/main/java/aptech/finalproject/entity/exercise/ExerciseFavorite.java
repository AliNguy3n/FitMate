package aptech.finalproject.entity.exercise;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseFavorite {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn( name = "favorite_id")
    private Favorite favorite;

    @ManyToOne( cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn( name = "sub_category_id")
    private ExerciseSubCategory subCategory;
}
