import React, { useState } from 'react';
import { Container, Card, Form, FormGroup, Input, Button, Row, Col, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { signUp } from '../services/user-service';
import { Link } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard, FaArrowLeft } from 'react-icons/fa';

const Signup = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const handleChange = (e, property) => {
        setData({ ...data, [property]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        
        // Basic Validation
        if(data.username.trim() === '' || data.password.trim() === ''){
            toast.error("Username and Password are required!");
            return;
        }

        // Call Server
        signUp(data).then((resp) => {
            console.log(resp);
            toast.success("Registration Successful! Please Login.");
            setData({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '' });
        }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong! Try again.");
        });
    };

    return (
        <div className="d-flex align-items-center min-vh-100 py-5" style={{ background: '#f0f2f5' }}>
            
            {/* Floating Back to Home Button */}
            <Link to="/" className="btn btn-light shadow-sm position-absolute top-0 start-0 m-4 rounded-pill px-3 fw-bold text-decoration-none text-dark z-index-10">
                <FaArrowLeft className="me-2" /> Back to Home
            </Link>

            <Container>
                <Row className="justify-content-center">
                    <Col md={11} lg={10}>
                        <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
                            <Row className="g-0">
                                
                                {/* LEFT SIDE: Premium Gradient & Text */}
                                <Col md={5} className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5" 
                                     style={{ background: 'linear-gradient(135deg, #4e54c8, #8f94fb)' }}>
                                    <h2 className="display-6 fw-bold mb-3">Join the Community</h2>
                                    <p className="text-center opacity-75 mb-4">
                                        Create an account to unlock exclusive quizzes, track your progress, and get certified.
                                    </p>
                                    <div className="d-flex align-items-center gap-2 border border-white rounded-pill px-4 py-2 bg-white bg-opacity-10">
                                        <FaUser /> <span>10,000+ Students</span>
                                    </div>
                                </Col>

                                {/* RIGHT SIDE: Registration Form */}
                                <Col md={7} className="p-5 bg-white">
                                    <div className="text-center mb-4">
                                        <h3 className="fw-bold text-dark">Create Account</h3>
                                        <p className="text-muted small">It only takes a minute</p>
                                    </div>

                                    <Form onSubmit={submitForm}>
                                        {/* Row 1: First Name & Last Name */}
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup className="mb-3">
                                                    <Label className="visually-hidden">First Name</Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0"><FaIdCard className="text-muted"/></span>
                                                        <Input type="text" placeholder="First Name" className="bg-light border-0 py-2" onChange={(e) => handleChange(e, 'firstName')} value={data.firstName} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="mb-3">
                                                    <Label className="visually-hidden">Last Name</Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0"><FaIdCard className="text-muted"/></span>
                                                        <Input type="text" placeholder="Last Name" className="bg-light border-0 py-2" onChange={(e) => handleChange(e, 'lastName')} value={data.lastName} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {/* Row 2: Username & Email */}
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup className="mb-3">
                                                    <Label className="visually-hidden">Username</Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0"><FaUser className="text-muted"/></span>
                                                        <Input type="text" placeholder="Username" className="bg-light border-0 py-2" onChange={(e) => handleChange(e, 'username')} value={data.username} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="mb-3">
                                                    <Label className="visually-hidden">Email</Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0"><FaEnvelope className="text-muted"/></span>
                                                        <Input type="email" placeholder="Email Address" className="bg-light border-0 py-2" onChange={(e) => handleChange(e, 'email')} value={data.email} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {/* Row 3: Phone & Password */}
                                        <Row>
                                            <Col md={6}>
                                                <FormGroup className="mb-3">
                                                    <Label className="visually-hidden">Phone</Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0"><FaPhone className="text-muted"/></span>
                                                        <Input type="number" placeholder="Phone Number" className="bg-light border-0 py-2" onChange={(e) => handleChange(e, 'phone')} value={data.phone} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup className="mb-4">
                                                    <Label className="visually-hidden">Password</Label>
                                                    <div className="input-group">
                                                        <span className="input-group-text bg-light border-0"><FaLock className="text-muted"/></span>
                                                        <Input type="password" placeholder="Password" className="bg-light border-0 py-2" onChange={(e) => handleChange(e, 'password')} value={data.password} />
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        {/* Submit Button */}
                                        <Button className="w-100 border-0 py-2 rounded-pill fw-bold shadow-sm mb-3" 
                                                style={{ background: 'linear-gradient(90deg, #4e54c8, #8f94fb)' }}>
                                            REGISTER NOW
                                        </Button>

                                        <div className="text-center">
                                            <p className="small text-muted mb-0">Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log In</Link></p>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;