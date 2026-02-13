package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List; // Added missing import for List

@RestController
@RequestMapping("/user")
@CrossOrigin("*") 
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. REGISTER USER
    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        
        // Remove spaces
        String cleanUsername = user.getUsername().trim();
        user.setUsername(cleanUsername);

        // Check duplicate
        User local = this.userRepository.findByUsername(cleanUsername);
        if (local != null) {
            return ResponseEntity.status(409).body("User already exists!");
        }

        // Set defaults
        user.setEnabled(true);
        user.setRole("NORMAL");
        user.setProfile("default.png"); 

        User savedUser = this.userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // 2. LOGIN USER (DEEP DEBUG MODE)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginData) {
        
        System.out.println("\n********** LOGIN DEBUG START **********");
        
        // 1. Clean the Input
        String inputUsername = loginData.getUsername().trim();
        String inputPassword = loginData.getPassword().trim();
        System.out.println("Trying to Login with: [" + inputUsername + "]");

        // 2. Try to find the user
        User user = this.userRepository.findByUsername(inputUsername);

        // 3. IF NOT FOUND -> PRINT EVERYONE IN THE DB
        if (user == null) {
            System.out.println(">>> ERROR: User '" + inputUsername + "' returned NULL.");
            System.out.println(">>> CHECKING DATABASE CONTENTS...");
            
            List<User> allUsers = this.userRepository.findAll();
            
            if (allUsers.isEmpty()) {
                System.out.println(">>> DATABASE IS EMPTY! (Check application.properties ddl-auto settings)");
            } else {
                System.out.println(">>> I found these users in the database:");
                for (User u : allUsers) {
                    System.out.println("   -> ID: " + u.getId() + " | Username: [" + u.getUsername() + "]");
                }
            }
            System.out.println("***************************************\n");
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        System.out.println(">>> SUCCESS: Found User: " + user.getUsername());
        
        // 4. Check Password
        if (!user.getPassword().equals(inputPassword)) {
            System.out.println(">>> ERROR: Password Mismatch!");
            return ResponseEntity.status(401).body(Map.of("message", "Invalid Password"));
        }
        
        // 5. Check Enabled
        if (user.isEnabled() == null || !user.isEnabled()) {
            return ResponseEntity.status(403).body(Map.of("message", "Account disabled"));
        }

        return ResponseEntity.ok(user);
    }

    // 3. GET USER
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username) {
        return this.userRepository.findByUsername(username);
    }
}