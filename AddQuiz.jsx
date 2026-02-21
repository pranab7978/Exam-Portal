import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import { myAxios } from '../../services/helper';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const AddQuiz = () => {
    const [quiz, setQuiz] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e, field) => {
        setQuiz({ ...quiz, [field]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        
        if (quiz.title.trim() === '') {
            toast.error("Quiz Title is required!");
            return;
        }

        // Backend API Call to save the quiz
        myAxios.post('/quiz/', quiz).then((response) => {
            toast.success("Quiz Added Successfully!");
            setQuiz({ title: '', description: '' });
        }).catch((error) => {
            toast.error("Error adding quiz! Server might be down.");
            console.log(error);
        });
    };

    return (
        <div className="mt-5 pt-5 bg-light min-vh-100">
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar />
                    </Col>
                    <Col md={10}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
                            <CardHeader className="bg-white border-0 pt-4 pb-0">
                                <h3 className="fw-bold" style={{color: '#4e54c8'}}>Add New Quiz</h3>
                            </CardHeader>
                            <CardBody className="p-4">
                                <Form onSubmit={submitForm}>
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold text-muted small">Quiz Title</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter Quiz Title (e.g., Java Basics)" 
                                            className="border-0 bg-light py-3"
                                            onChange={(e) => handleChange(e, 'title')}
                                            value={quiz.title}
                                        />
                                    </FormGroup>
                                    
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold text-muted small">Quiz Description</Label>
                                        <Input 
                                            type="textarea" 
                                            placeholder="Enter details about this quiz..." 
                                            style={{ height: 150 }} 
                                            className="border-0 bg-light p-3"
                                            onChange={(e) => handleChange(e, 'description')}
                                            value={quiz.description}
                                        />
                                    </FormGroup>
                                    
                                    <div className="text-center mt-4">
                                        <Button color="primary" size="lg" className="px-5 rounded-pill shadow-sm">
                                            Create Quiz
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddQuiz;