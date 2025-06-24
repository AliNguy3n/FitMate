package aptech.finalproject.repository;

import aptech.finalproject.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

    Set<Role> findByRole(String role);
}
