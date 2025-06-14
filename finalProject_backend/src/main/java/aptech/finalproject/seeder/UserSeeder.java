package aptech.finalproject.seeder;

import aptech.finalproject.emums.PredefinedPermission;
import aptech.finalproject.emums.PredefinedRole;
import aptech.finalproject.entity.Permission;
import aptech.finalproject.entity.Role;
import aptech.finalproject.entity.User;
import aptech.finalproject.repository.PermissionRepository;
import aptech.finalproject.repository.RoleRepository;
import aptech.finalproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Component
@Transactional
public class UserSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public void run(String... args) throws Exception {

        //Seed Permission
        for (PredefinedPermission predefined : PredefinedPermission.values()) {
            if (!permissionRepository.existsById(predefined.getPermission())) {
                Permission permission = new Permission();
                permission.setPermission(predefined.getPermission());
                permission.setDescription(predefined.getDescription());
                permissionRepository.save(permission);
            }
        }

        //Seed Role
        for (PredefinedRole predefined : PredefinedRole.values()) {
            if (!roleRepository.existsById(predefined.getRole())) {
                Role role = new Role();
                role.setRole(predefined.getRole());
                role.setDescription(predefined.getDescription());
                roleRepository.save(role);
            }
        }

        //Seed User (Admin)
        Optional<Role> adminRoleOpt = roleRepository.findById(PredefinedRole.ADMIN.getRole());

        if (adminRoleOpt.isPresent()) {
            Role adminRole = adminRoleOpt.get();

            if (!userRepository.existsByUsername("admin")) {
                User admin = User.builder()
                        .username("admin")
                        .email("admin@admin.com")
                        .password(new BCryptPasswordEncoder(10).encode("123"))
                        .roles(Set.of(adminRole)) // Dùng role đã có
                        .build();

                userRepository.save(admin);
                System.out.println("Admin user created.");
            } else {
                System.out.println("Admin user already exists.");
            }
        } else {
            System.out.println("Admin role not found. Please seed roles first.");
        }
    }
}
