import React, { useState } from 'react';
import { Container, Card, Form, FormGroup, Input, Button, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { signUp } from '../services/user-service';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaIdCard, FaArrowLeft, FaUserPlus } from 'react-icons/fa';

const Signup = () => {
    const [data, setData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const navigate = useNavigate();

    const handleChange = (e, property) => {
        setData({ ...data, [property]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        
        if(data.username.trim() === '' || data.password.trim() === ''){
            toast.error("Username and Password are required!");
            return;
        }

        signUp(data).then((resp) => {
            toast.success("Registration Successful! Please Login.");
            setData({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '' });
            navigate("/login"); 
        }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong! Try again.");
        });
    };

    // Shared style for inputs to match Login page
    const inputGroupStyle = "input-group mb-3";
    const iconStyle = "input-group-text border-0 bg-light ps-3";
    const inputFieldStyle = "border-0 bg-light py-2 shadow-none";

    return (
        // 1. Background Container (Same Navy Blue as Login)
        <div style={{ minHeight: '100vh', background: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            
            {/* 2. Floating Back Button */}
            <Link to="/" className="btn btn-light position-absolute top-0 start-0 m-4 rounded-circle d-flex align-items-center justify-content-center shadow" style={{ width: '45px', height: '45px', zIndex: 100 }}>
                <FaArrowLeft />
            </Link>

            <Container>
                <Row className="justify-content-center">
                    <Col md={11} lg={10}>
                        <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
                            <Row className="g-0">
                                
                                {/* 3. LEFT SIDE: Dark Area (Visuals) */}
                                <Col md={5} className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5" 
                                     style={{ background: '#172554' }}> {/* Matches Login Left Side */}
                                    
                                    <div className="text-center">
                                        <div className="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px' }}>
                                            <FaUserPlus size={35} className="text-white" />
                                        </div>
                                        <h2 className="fw-bold display-6 mb-3">Join Us!</h2>
                                        <p className="opacity-75 mb-4 small">
                                            "Create an account to unlock exclusive quizzes, track your progress, and get certified today."
                                        </p>
                                        <div className="border border-white rounded-pill px-4 py-2 d-inline-block">
                                            <small className="fw-bold text-uppercase ls-1">10,000+ Students</small>
                                        </div>
                                    </div>
                                </Col>

                                {/* 4. RIGHT SIDE: White Form Area */}
                                <Col md={7} className="bg-white p-5">
                                    <div className="text-center mb-4">
                                        <h3 className="fw-bold text-dark">Create Account</h3>
                                        <p className="text-muted small">It only takes a minute</p>
                                    </div>

                                    <Form onSubmit={submitForm}>
                                        <Row>
                                            <Col md={6}>
                                                <div className={inputGroupStyle}>
                                                    <span className={iconStyle}><FaIdCard className="text-muted"/></span>
                                                    <Input type="text" placeholder="First Name" className={inputFieldStyle} onChange={(e) => handleChange(e, 'firstName')} value={data.firstName} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className={inputGroupStyle}>
                                                    <span className={iconStyle}><FaIdCard className="text-muted"/></span>
                                                    <Input type="text" placeholder="Last Name" className={inputFieldStyle} onChange={(e) => handleChange(e, 'lastName')} value={data.lastName} />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <div className={inputGroupStyle}>
                                                    <span className={iconStyle}><FaUser className="text-muted"/></span>
                                                    <Input type="text" placeholder="Username" className={inputFieldStyle} onChange={(e) => handleChange(e, 'username')} value={data.username} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className={inputGroupStyle}>
                                                    <span className={iconStyle}><FaEnvelope className="text-muted"/></span>
                                                    <Input type="email" placeholder="Email" className={inputFieldStyle} onChange={(e) => handleChange(e, 'email')} value={data.email} />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <div className={inputGroupStyle}>
                                                    <span className={iconStyle}><FaPhone className="text-muted"/></span>
                                                    <Input type="number" placeholder="Phone" className={inputFieldStyle} onChange={(e) => handleChange(e, 'phone')} value={data.phone} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className={inputGroupStyle}>
                                                    <span className={iconStyle}><FaLock className="text-muted"/></span>
                                                    <Input type="password" placeholder="Password" className={inputFieldStyle} onChange={(e) => handleChange(e, 'password')} value={data.password} />
                                                </div>
                                            </Col>
                                        </Row>

                                        {/* Register Button */}
                                        <Button className="w-100 border-0 rounded-pill fw-bold shadow-sm py-2 mt-2 mb-3" 
                                                style={{ background: '#172554' }}> {/* Matches Left Side Color */}
                                            REGISTER NOW
                                        </Button>

                                        <div className="text-center">
                                            <p className="small text-muted mb-0">
                                                Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Log In</Link>
                                            </p>
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