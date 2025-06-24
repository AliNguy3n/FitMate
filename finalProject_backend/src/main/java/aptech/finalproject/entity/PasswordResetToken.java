package aptech.finalproject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PasswordResetToken {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    private Instant expiryDate;

    @ManyToOne
    private User user;
    @Builder.Default
    private boolean used = false;
}
