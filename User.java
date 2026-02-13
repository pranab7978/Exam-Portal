package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    
    // FIX: Changed from 'boolean' to 'Boolean' (Wrapper Class)
    // This allows it to handle 'null' values from the frontend safely
    private Boolean enabled = true; 
    
    private String profile;
    private String role = "NORMAL"; 

    // --- CONSTRUCTORS ---
    public User() {}

    // Updated constructor to accept Boolean
    public User(Long id, String username, String password, String firstName, String lastName, String email, String phone, Boolean enabled, String profile, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.enabled = enabled;
        this.profile = profile;
        this.role = role;
    }

    // --- GETTERS AND SETTERS ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    // FIX: Updated return type to Boolean
    public Boolean isEnabled() { return enabled; }
    
    // FIX: Updated parameter type to Boolean
    public void setEnabled(Boolean enabled) { this.enabled = enabled; }

    public String getProfile() { return profile; }
    public void setProfile(String profile) { this.profile = profile; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}