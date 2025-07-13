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
public class ExerciseProgram {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany( mappedBy = "exerciseProgram")
    private List<ExerciseSubProgram> exerciseSubPrograms;
}
