import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, Container, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';

const Instructions = () => {
    const { qid } = useParams(); 
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const startQuiz = () => {
        if (agreed) {
            // FIX: Create an obfuscated URL with symbols
            const secretSalt = "$%&_exam_secure_#@!";
            // Encode ID + Salt into Base64, then URL encode it
            const encryptedId = encodeURIComponent(btoa(qid + secretSalt)); 
            
            // Navigate using symbols in query params
            navigate(`/attempt?token=${encryptedId}&secure_session=%24%25%26&auth=true`);
        } else {
            toast.error("Please agree to the terms first!");
        }
    };

    return (
        <div style={{ height: "100vh", width: "100vw", background: "#f4f6f9", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
            <Container>
                <div className="d-flex justify-content-center">
                    <Card className="shadow-lg border-0" style={{ maxWidth: "800px", width: "100%", maxHeight: "90vh" }}>
                        <CardBody className="p-5" style={{ overflowY: "auto" }}>
                            <div className="text-center mb-4">
                                <h2 className="fw-bold text-primary">Exam Instructions</h2>
                                <p className="text-muted">Please read the rules carefully before starting.</p>
                            </div>
                            <hr />
                            <div className="mt-4 p-4 bg-light rounded">
                                <ul style={{ fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
                                    <li>All questions are of <b>Multiple Choice</b> type.</li>
                                    <li>Progress is <b>Automatically Saved</b> if you lose connection.</li>
                                    <li><b>Do not refresh</b> the page during the exam. Doing so may cause disruptions.</li>
                                    <li>The timer starts immediately after clicking <b>Start Quiz</b>.</li>
                                    <li>The exam submits automatically when the timer reaches 00:00.</li>
                                </ul>
                            </div>
                            <hr className="my-4"/>
                            <div className="form-check mt-3 d-flex justify-content-center align-items-center">
                                <Input type="checkbox" className="form-check-input" id="agreeBox" style={{ transform: "scale(1.2)", cursor: "pointer" }} onChange={() => setAgreed(!agreed)} />
                                <Label className="form-check-label fw-bold ms-3" htmlFor="agreeBox" style={{ cursor: "pointer", fontSize: "1.1rem" }}>
                                    I have read and understood the instructions.
                                </Label>
                            </div>
                            <div className="mt-4 text-center">
                                <Button color="primary" size="lg" disabled={!agreed} onClick={startQuiz} className="px-5 py-2 shadow" style={{ borderRadius: "30px", fontSize: "1.2rem" }}>
                                    Start Quiz
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default Instructions;