package aptech.finalproject.entity.exercise;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Long duration;

    private Long totalKcal;

    @OneToMany(mappedBy = "exercise",cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<ExerciseSession> sessions;

    @ManyToOne
    @JoinColumn( name = "sub_category_id")
    private ExerciseSubCategory subCategory;
}
