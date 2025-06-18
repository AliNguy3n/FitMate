package aptech.finalproject.repository;

import aptech.finalproject.entity.PasswordResetToken;
import aptech.finalproject.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    PasswordResetToken findByUserAndUsed(User user, boolean used);

    Optional<PasswordResetToken> findByToken(String token);
}
