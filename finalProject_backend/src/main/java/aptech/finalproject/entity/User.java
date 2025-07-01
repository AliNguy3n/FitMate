package aptech.finalproject.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

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
}
