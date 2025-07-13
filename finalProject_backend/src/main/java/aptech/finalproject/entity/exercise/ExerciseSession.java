package aptech.finalproject.entity.exercise;

import aptech.finalproject.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table( name = "exerciseSession")
public class ExerciseSession {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private Long kcal;

    private Long resetBatch;

    private Long duration;

    @CreationTimestamp
    private Instant createdAt;


    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    @ManyToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn( name = "exercise_user_id")
    private ExerciseUser exerciseUser;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn( name = "exercise_progress_id")
    private ExerciseProgress exerciseProgress;

}
