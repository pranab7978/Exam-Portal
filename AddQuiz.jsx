import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import { myAxios } from '../../services/helper';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const AddQuiz = () => {
    const [categories, setCategories] = useState([]);
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        category: { cid: '' } // Added category mapping
    });

    // Fetch categories when component loads
    useEffect(() => {
        myAxios.get('/category/').then((res) => {
            setCategories(res.data);
        }).catch((error) => {
            toast.error("Error loading categories!");
        });
    }, []);

    const handleChange = (e, field) => {
        if (field === 'category') {
            setQuiz({ ...quiz, category: { cid: e.target.value } });
        } else {
            setQuiz({ ...quiz, [field]: e.target.value });
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        
        if (quiz.title.trim() === '' || quiz.category.cid === '') {
            toast.error("Title and Category are required!");
            return;
        }

        myAxios.post('/quiz/', quiz).then((response) => {
            toast.success("Quiz Added Successfully!");
            setQuiz({ title: '', description: '', category: { cid: '' } });
        }).catch((error) => {
            toast.error("Server Error!");
            console.log(error);
        });
    };

    return (
        <div className="mt-5 pt-5 bg-light min-vh-100">
            <Container fluid>
                <Row>
                    <Col md={2}><Sidebar /></Col>
                    <Col md={10}>
                        <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
                            <CardHeader className="bg-white border-0 pt-4 pb-0">
                                <h3 className="fw-bold" style={{color: '#4e54c8'}}>Add New Quiz</h3>
                            </CardHeader>
                            <CardBody className="p-4">
                                <Form onSubmit={submitForm}>
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold text-muted small">Quiz Title</Label>
                                        <Input type="text" placeholder="Enter Quiz Title" 
                                            className="border-0 bg-light py-3"
                                            onChange={(e) => handleChange(e, 'title')} value={quiz.title} />
                                    </FormGroup>
                                    
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold text-muted small">Quiz Description</Label>
                                        <Input type="textarea" placeholder="Enter details..." 
                                            style={{ height: 100 }} className="border-0 bg-light p-3"
                                            onChange={(e) => handleChange(e, 'description')} value={quiz.description} />
                                    </FormGroup>

                                    {/* NEW: Category Dropdown */}
                                    <FormGroup className="mb-4">
                                        <Label className="fw-bold text-muted small">Select Category</Label>
                                        <Input type="select" className="border-0 bg-light py-3"
                                            onChange={(e) => handleChange(e, 'category')} value={quiz.category.cid}>
                                            <option value="">-- Select Category --</option>
                                            {categories.map((c) => (
                                                <option key={c.cid} value={c.cid}>{c.title}</option>
                                            ))}
                                        </Input>
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