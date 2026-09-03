package in.mindcraft.controller;

import in.mindcraft.security.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "http://127.0.0.1:4200"
})
public class AuthController {

    private final AuthenticationManager manager;
    private final UserDetailsService users;
    private final JwtService jwt;

    public AuthController(
            AuthenticationManager manager,
            UserDetailsService users,
            JwtService jwt) {

        this.manager = manager;
        this.users = users;
        this.jwt = jwt;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String username =
                request.getOrDefault("username", "").trim();

        String password =
                request.getOrDefault("password", "");

        try {

            manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    username,
                    password
                )
            );

            UserDetails user =
                    users.loadUserByUsername(username);

            String role =
                    user.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
                        .replace("ROLE_", "");

            return ResponseEntity.ok(
                Map.of(
                    "token", jwt.generateToken(user),
                    "username", username,
                    "role", role
                )
            );

        } catch (AuthenticationException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(
                        Map.of(
                            "message",
                            "Invalid username or password"
                        )
                    );
        }
    }
}