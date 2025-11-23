package com.nicaxel.userservice.service;

import com.nicaxel.userservice.dto.AuthResponse;
import com.nicaxel.userservice.dto.LoginRequest;
import com.nicaxel.userservice.dto.RegisterRequest;
import com.nicaxel.userservice.model.Role;
import com.nicaxel.userservice.model.User;
import com.nicaxel.userservice.repository.UserRepository;
import com.nicaxel.userservice.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public UserService(UserRepository repo, PasswordEncoder encoder, JwtService jwtService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtService = jwtService;
    }

    public void register(RegisterRequest request) {
        if (repo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole()));

        repo.save(user);
    }

    public AuthResponse login(LoginRequest request) {
    User user = repo.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    if (!encoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Contraseña incorrecta");
    }

    String token = jwtService.generateToken(
            user.getEmail(),
            user.getRole().name()
    );

    return new AuthResponse(
            token,
            user.getEmail(),
            user.getRole().name(),
            user.getName() 
    );
}

}
