package aptech.finalproject.seeder;

import aptech.finalproject.emums.Role;
import aptech.finalproject.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoleSeeder implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        List<String> roles = Role.
    }
}
