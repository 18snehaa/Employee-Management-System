package in.mindcraft.config;

import in.mindcraft.entity.User;
import in.mindcraft.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(
            UserRepository repository,
            PasswordEncoder encoder) {

        return args -> {

            createUser(
                    repository,
                    encoder,
                    "admin",
                    "admin123",
                    "ADMIN"
            );

            createUser(
                    repository,
                    encoder,
                    "user",
                    "user123",
                    "USER"
            );

            System.out.println("================================");
            System.out.println("LOGIN USERS READY");
            System.out.println("ADMIN -> admin / admin123");
            System.out.println("USER  -> user / user123");
            System.out.println("================================");
        };
    }

    private void createUser(
            UserRepository repository,
            PasswordEncoder encoder,
            String username,
            String password,
            String role) {

        User user = repository
                .findByUsername(username)
                .orElseGet(User::new);

        user.setUsername(username);
        user.setPassword(encoder.encode(password));
        user.setRole(role);

        repository.save(user);
    }
}