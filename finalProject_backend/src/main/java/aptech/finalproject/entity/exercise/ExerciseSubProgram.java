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
public class ExerciseSubProgram {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne( cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn( name = "program_id")
    private ExerciseProgram exerciseProgram;
}
