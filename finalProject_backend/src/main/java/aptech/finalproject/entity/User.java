package aptech.finalproject.entity;

import aptech.finalproject.entity.exercise.*;
import aptech.finalproject.entity.meal.Meal;
import aptech.finalproject.entity.meal.UserMeal;
import aptech.finalproject.entity.product.Order;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true, length = 30)
    @Size(min = 3, max = 30, message = "USERNAME_INVALID")
    private String username;

    @Column(nullable = false, length = 128)
    private String password;

    @Column(nullable = true, length = 128)
    private String firstName;

    @Column(nullable = true, length = 128)
    private String lastName;

    @Column(unique = true, nullable = false, length = 128)
    private String email;

    @Column(unique = true, nullable = true, length = 14)
    private String phone;

    @Column(nullable = true, length = 128)
    private String address;

    @Builder.Default
    private boolean active = false;

    private LocalDate dob;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user",cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<UserMeal> meals;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ExerciseProgress> progress;

    @OneToMany( mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Health> health;

    @OneToMany( mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<HealthGoal> healthGoal;

    @OneToMany( mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Favorite> favorite;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ExerciseSchedule> schedules;

    @OneToMany( mappedBy = "user", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Order> orders;
}
