package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qid; // Standardized naming to avoid Bean convention issues

    private String title;
    
    @Column(length = 5000)
    private String description;

    public Quiz() {}

    public Long getQid() { 
        return qid; 
    }
    
    public void setQid(Long qid) { 
        this.qid = qid; 
    }

    public String getTitle() { 
        return title; 
    }
    
    public void setTitle(String title) { 
        this.title = title; 
    }

    public String getDescription() { 
        return description; 
    }
    
    public void setDescription(String description) { 
        this.description = description; 
    }
}