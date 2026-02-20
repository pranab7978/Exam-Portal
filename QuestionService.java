package com.example.demo.service;

import com.example.demo.model.Question;
import com.example.demo.repo.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // Add Question
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    // Update Question
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    // Get All Questions
    public List<Question> getQuestions() {
        return this.questionRepository.findAll();
    }

    // Get Single Question
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).orElse(null);
    }

    // Get Questions of Specific Quiz
    public List<Question> getQuestionsOfQuiz(Long quizId) {
        return this.questionRepository.findByQuizId(quizId);
    }

    // Delete Question
    public void deleteQuestion(Long quesId) {
        this.questionRepository.deleteById(quesId);
    }
}