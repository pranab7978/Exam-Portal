import React, { useState } from 'react';
import { Container, Form, Input, Button, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { myAxios } from '../services/helper';
import { doLogin } from '../services/login-service';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [loginDetail, setLoginDetail] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e, field) => setLoginDetail({ ...loginDetail, [field]: e.target.value });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (loginDetail.username.trim() === '' || loginDetail.password.trim() === '') {
            toast.error("Please enter username and password!");
            return;
        }

        myAxios.post('/generate-token', loginDetail)
            .then((res) => {
                // Success: Login the user
                doLogin(res.data.token, () => {
                    myAxios.get('/current-user', { headers: { Authorization: `Bearer ${res.data.token}` } })
                        .then((userRes) => {
                            localStorage.setItem("user", JSON.stringify(userRes.data));
                            
                            // Redirect based on Role
                            if (userRes.data.authorities[0].authority === "ADMIN") {
                                navigate("/admin/dashboard");
                            } else {
                                navigate("/user/dashboard");
                            }
                            toast.success("Login Successful!");
                        });
                });
            })
            .catch((error) => {
                console.log(error);
                // ERROR HANDLING: Specific message as requested
                if (error.response && (error.response.status === 404 || error.response.status === 401)) {
                    toast.error("User is not found / Invalid Credentials");
                } else {
                    toast.error("User is not found");
                }
            });
    };

    return (
        <div className="login-container">
            <Container>
                <Row className="align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    
                    {/* Left Side: Text (Like the "Explore Horizons" text) */}
                    <Col md={7} className="text-white d-none d-md-block">
                        <h1 className="display-3 fw-bold">EXAM PORTAL</h1>
                        <h2 className="display-5 fw-light">MASTER YOUR SKILLS</h2>
                        <p className="lead mt-4" style={{maxWidth: '500px', opacity: 0.9}}>
                            Where your preparation meets success. Embark on a journey to achieve your certification goals today.
                        </p>
                    </Col>

                    {/* Right Side: Glass Form */}
                    <Col md={5}>
                        <div className="glass-card p-5">
                            <h4 className="text-white mb-4">Login</h4>
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
                                <div className="mb-4">
                                    <label className="text-white small mb-1">Password</label>
                                    <Input 
                                        type="password" 
                                        className="glass-input" 
                                        placeholder="**********"
                                        value={loginDetail.password}
                                        onChange={(e) => handleChange(e, 'password')}
                                    />
                                    <div className="text-end mt-2">
                                        <a href="#" className="text-white-50 small text-decoration-none">Forgot password?</a>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <Button className="w-100 btn-primary-glass mb-3">
                                    SIGN IN
                                </Button>

                                {/* Separator */}
                                <div className="text-center text-white-50 mb-3 small">
                                    <span>or</span>
                                </div>

                                {/* Create Account */}
                                <div className="text-center">
                                    <span className="text-white small">Are you new? </span>
                                    <Link to="/signup" className="text-white fw-bold text-decoration-underline">
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