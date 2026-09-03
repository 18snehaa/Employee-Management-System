package in.mindcraft.controller;

import in.mindcraft.security.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService,
            JwtService jwtService) {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Map<String, String> request) {

        String username =
                request.getOrDefault("username", "").trim();

        String password =
                request.getOrDefault("password", "");

        if (username.isBlank() || password.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body(
                        Map.of(
                            "message",
                            "Username and password are required"
                        )
                    );
        }

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password
                    )
            );

            UserDetails user =
                    userDetailsService
                            .loadUserByUsername(username);

            String role =
                    user.getAuthorities()
                            .stream()
                            .findFirst()
                            .map(authority ->
                                    authority
                                            .getAuthority()
                                            .replace("ROLE_", "")
                            )
                            .orElse("");

            String token =
                    jwtService.generateToken(user);

            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "username", username,
                            "role", role
                    )
            );

        } catch (AuthenticationException ex) {

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