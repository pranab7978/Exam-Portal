import React, { useState } from 'react';
import { Container, Form, Input, Button, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { doLogin } from '../services/login-service';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'; // 1. IMPORT AXIOS

const Login = () => {
    const [loginDetail, setLoginDetail] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e, field) => setLoginDetail({ ...loginDetail, [field]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
            toast.error("Please enter username and password!");
            return;
        }

        // 2. CHANGED URL TO CORRECT BACKEND ENDPOINT
        axios.post(`http://localhost:8080/user/login`, loginDetail)
            .then((res) => {
                
                // 3. SIMPLIFIED SUCCESS LOGIC
                // Your backend returns the USER object directly, so we save it.
                // We pass 'null' as token because your current backend isn't generating one yet.
                doLogin(null, () => {
                    
                    // Save User to LocalStorage
                    localStorage.setItem("user", JSON.stringify(res.data));
                    
                    // Check Role and Redirect
                    if (res.data.role === "ADMIN") {
                        navigate("/admin/dashboard");
                    } else {
                        navigate("/user/dashboard");
                    }
                    
                    toast.success("Login Successful!");
                });
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    if (error.response.status === 404) {
                        toast.error("User not found");
                    } else if (error.response.status === 401) {
                        toast.error("Invalid Credentials");
                    } else if (error.response.status === 403) {
                        toast.error("Account Disabled");
                    } else {
                        toast.error("Something went wrong on Server");
                    }
                } else {
                    toast.error("Server not responding (Check Java Console)");
                }
            });
    };

    return (
        <div className="login-container">
            <Container>
                <Row className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    
                    {/* Left Side */}
                    <Col md={7} className="text-white d-none d-md-block">
                        <h1 className="display-3 fw-bold ls-tight">EXPLORE <br/> HORIZONS</h1>
                        <p className="lead mt-3 text-white-50" style={{maxWidth: '500px'}}>
                            Where Your Dream Destinations Become Reality. Embark on a journey where every corner of the world is within your reach.
                        </p>
                    </Col>

                    {/* Right Side */}
                    <Col md={5}>
                        <div className="glass-card p-4 p-md-5">
                            <h3 className="text-white fw-bold mb-1">Login</h3>
                            <p className="text-white-50 small mb-4">Access your dashboard</p>
                            
                            <Form onSubmit={handleFormSubmit}>
                                {/* Username */}
                                <div className="mb-3">
                                    <label className="text-white small mb-1">Username</label>
                                    <Input 
                                        type="text" 
                                        className="glass-input" 
                                        placeholder="Enter your username"
                                        value={loginDetail.username}
                                        onChange={(e) => handleChange(e, 'username')}
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-2">
                                    <label className="text-white small mb-1">Password</label>
                                    <Input 
                                        type="password" 
                                        className="glass-input" 
                                        placeholder="**********"
                                        value={loginDetail.password}
                                        onChange={(e) => handleChange(e, 'password')}
                                    />
                                </div>
                                
                                <div className="text-end mb-4">
                                    <a href="#" className="text-white-50 small text-decoration-none hover-white">Forgot password?</a>
                                </div>

                                <Button className="w-100 btn-primary-glass mb-3">
                                    SIGN IN
                                </Button>

                                <div className="d-flex align-items-center mb-3">
                                    <div className="flex-grow-1 bg-white-50" style={{height: '1px', opacity: 0.2}}></div>
                                    <span className="mx-3 text-white-50 small">or</span>
                                    <div className="flex-grow-1 bg-white-50" style={{height: '1px', opacity: 0.2}}></div>
                                </div>

                                <button type="button" className="w-100 btn-google-glass d-flex align-items-center justify-content-center">
                                    <FcGoogle size={20} className="me-2" />
                                    <span>Sign in with Google</span>
                                </button>

                                <div className="text-center mt-4">
                                    <span className="text-white small">Are you new? </span>
                                    <Link to="/signup" className="text-white fw-bold text-decoration-underline ms-1">
                                        Create an Account
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;