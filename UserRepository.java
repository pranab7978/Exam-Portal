package com.example.demo.repo;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Custom method to find a user by their username
    User findByUsername(String username);
    
    // Custom method to check if a user exists by email (Optional but good for validation)
    User findByEmail(String email);
}