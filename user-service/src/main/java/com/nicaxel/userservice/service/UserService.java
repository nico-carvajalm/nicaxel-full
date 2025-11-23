package com.nicaxel.userservice.service;

import com.nicaxel.userservice.dto.AuthResponse;
import com.nicaxel.userservice.dto.LoginRequest;
import com.nicaxel.userservice.dto.RegisterRequest;
import com.nicaxel.userservice.dto.UserDto;
import com.nicaxel.userservice.model.Role;
import com.nicaxel.userservice.model.User;
import com.nicaxel.userservice.repository.UserRepository;
import com.nicaxel.userservice.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    // ---------- REGISTRO PÚBLICO ----------
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

    // ---------- LOGIN ----------
    public AuthResponse login(LoginRequest request) {

        System.out.println("---- LOGIN REQUEST ----");
        System.out.println("Email recibido: '" + request.getEmail() + "'");
        System.out.println("Password recibido: '" + request.getPassword() + "'");

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

    // ---------- GESTIÓN DE USUARIOS (ADMIN / PANEL) ----------

    public List<UserDto> getAllUsers() {
        return repo.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // crear usuario desde el panel 
    public UserDto createUser(RegisterRequest request) {

        if (repo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole())); // "ADMIN" o "USER"

        User saved = repo.save(user);
        return mapToDto(saved);
    }

    public void deleteUser(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        repo.deleteById(id);
    }

    private UserDto mapToDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
