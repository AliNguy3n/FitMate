package aptech.finalproject.entity.exercise;

import aptech.finalproject.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "exerciseProgress")
public class ExerciseProgress {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private Long progressPercent;

    private Instant lastUpdated;

    @OneToMany(mappedBy = "exerciseProgress")
    private List<ExerciseSession> sessions;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id")
    private User user;
}
