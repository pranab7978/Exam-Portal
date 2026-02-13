import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaRocket, FaChartLine, FaLaptopCode, FaShieldAlt, FaAward, FaUsers } from 'react-icons/fa';

const Home = () => {
    return (
        <div>
            {/* 1. HERO SECTION */}
            <div className="hero-section text-center">
                <Container>
                    <Row>
                        <Col md={{ size: 8, offset: 2 }}>
                            <h1 className="display-4 fw-bold mb-4">Master Your Professional Skills</h1>
                            <p className="lead mb-5 opacity-75">
                                The most secure and reliable platform for Online Exams, Quizzes, and Certifications. 
                                Join 10,000+ students today.
                            </p>
                            <Link to="/signup">
                                <Button color="warning" size="lg" className="fw-bold text-dark px-5 rounded-pill shadow-lg hover-scale">
                                    Get Started For Free
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* 2. FEATURES SECTION (Floating Cards) */}
            <Container className="mb-5">
                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="feature-card text-center p-4">
                            <CardBody>
                                <div className="icon-circle">
                                    <FaRocket />
                                </div>
                                <h5 className="fw-bold">Fast Performance</h5>
                                <p className="text-muted small mt-3">
                                    Optimized with Spring Boot backend for lightning-fast question loading and result processing.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="feature-card text-center p-4">
                            <CardBody>
                                <div className="icon-circle">
                                    <FaChartLine />
                                </div>
                                <h5 className="fw-bold">Live Analytics</h5>
                                <p className="text-muted small mt-3">
                                    Get detailed graphical reports, accuracy checks, and performance insights instantly after the exam.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="feature-card text-center p-4">
                            <CardBody>
                                <div className="icon-circle">
                                    <FaLaptopCode />
                                </div>
                                <h5 className="fw-bold">Coding Support</h5>
                                <p className="text-muted small mt-3">
                                    Built-in support for code snippets and syntax highlighting for technical programming quizzes.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* 3. WHY CHOOSE US SECTION */}
            <Container className="py-5">
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="fw-bold text-primary">Why Choose ExamPortal?</h2>
                        <p className="text-muted">We provide the best environment for your assessments.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4} className="text-center mb-4">
                        <FaShieldAlt size={40} className="text-success mb-3" />
                        <h5>100% Secure</h5>
                        <p className="text-muted small">JWT Authentication & Data Encryption.</p>
                    </Col>
                    <Col md={4} className="text-center mb-4">
                        <FaAward size={40} className="text-warning mb-3" />
                        <h5>Certified Exams</h5>
                        <p className="text-muted small">Get certificates upon completion.</p>
                    </Col>
                    <Col md={4} className="text-center mb-4">
                        <FaUsers size={40} className="text-info mb-3" />
                        <h5>User Friendly</h5>
                        <p className="text-muted small">Clean UI designed for focus.</p>
                    </Col>
                </Row>
            </Container>

            {/* 4. FOOTER */}
            <div className="bg-dark text-white py-4 mt-5">
                <Container className="text-center">
                    <p className="mb-0">&copy; 2026 ExamPortal. All Rights Reserved.</p>
                    <small className="text-muted">Built with React & Spring Boot</small>
                </Container>
            </div>
        </div>
    );
};

export default Home;