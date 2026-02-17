ExamPortal - Online Examination System
A full-stack web application designed to facilitate online examinations. This system allows Administrators to manage quizzes and questions, while Students can register, login, and take timed exams in a secure environment.

✨ Key Features
🔐 Authentication & Security
Secure Login/Signup: User authentication with encrypted passwords.

Role-Based Access Control: Distinct dashboards for ADMIN and NORMAL (Student) users.

Modern UI: Glassmorphism design for Login and Signup pages.

👨‍💼 Admin Module
Dashboard: Overview of system statistics.

Category Management: Add and manage exam categories.

Quiz Management: Create, update, and manage quizzes.

Question Management: Add questions with rich text support (using React Quill).

👨‍🎓 Student Module
User Dashboard: View available quizzes.

Exam Interface:

Instruction page before starting.

Live Timer: Auto-submits the exam when time runs out.

Anti-Cheating: Warning on page refresh.

Real-time question navigation.

🛠️ Tech Stack
Frontend
Library: React.js (Vite)

Styling: Bootstrap 5, Reactstrap, Custom CSS

Routing: React Router DOM

HTTP Client: Axios

Rich Text Editor: React Quill New

Notifications: React Toastify

Backend
Framework: Spring Boot

Language: Java 17+

Database: MySQL

ORM: Spring Data JPA / Hibernate

Build Tool: Maven
