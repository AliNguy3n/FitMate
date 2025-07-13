package aptech.finalproject.entity.exercise;

import aptech.finalproject.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Health {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private Float height;

    private Float weight;

    private Float bmi;

    @CreationTimestamp
    @Column(updatable = false)
    private Instant createdAt;

    @ManyToOne( cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "user_id")
    private User user;
}
