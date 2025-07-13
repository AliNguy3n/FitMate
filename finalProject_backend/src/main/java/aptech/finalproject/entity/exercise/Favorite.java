package aptech.finalproject.entity.exercise;

import aptech.finalproject.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Favorite {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne( cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany( mappedBy = "favorite")
    private List<ExerciseFavorite> exerciseFavorites;
}
