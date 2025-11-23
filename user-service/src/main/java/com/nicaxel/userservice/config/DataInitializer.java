package com.nicaxel.userservice.config;

import com.nicaxel.userservice.model.Role;
import com.nicaxel.userservice.model.User;
import com.nicaxel.userservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public DataInitializer(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (!repo.existsByEmail("admin@nicaxel.com")) {

            User admin = new User();
            admin.setName("Administrador");
            admin.setEmail("admin@nicaxel.com");
            admin.setPassword(encoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            repo.save(admin);

            System.out.println("✔ ADMIN creado: admin@nicaxel.com / admin123");
        }
    }
}
