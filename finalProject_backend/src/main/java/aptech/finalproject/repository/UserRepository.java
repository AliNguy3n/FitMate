package aptech.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import aptech.finalproject.entity.auth.User;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findById(String id);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);
}
