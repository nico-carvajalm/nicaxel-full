package com.nicaxel.userservice.controller;

import com.nicaxel.userservice.dto.RegisterRequest;
import com.nicaxel.userservice.dto.UserDto;
import com.nicaxel.userservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin 
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // lista todos los usuarios 
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //  crear usuario 
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody RegisterRequest request) {
        UserDto created = userService.createUser(request);
        return ResponseEntity.ok(created);
    }

    // eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
