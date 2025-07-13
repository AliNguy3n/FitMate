package aptech.finalproject.entity.exercise;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "exerciseUser")
public class ExerciseUser {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private Long kcal;

    @CreationTimestamp
    private Instant createdAt;
}
