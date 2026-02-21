import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { myAxios } from '../../services/helper';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';

const AddCategory = () => {
    const [category, setCategory] = useState({ title: '', description: '' });

    const handleChange = (e, field) => {
        setCategory({ ...category, [field]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (category.title.trim() === '') {
            toast.error("Title is required!");
            return;
        }

        // Backend API Call
        // Make sure your Spring Boot has @PostMapping("/category/")
        myAxios.post('/category/', category).then((response) => {
            toast.success("Category Added Successfully!");
            setCategory({ title: '', description: '' });
        }).catch((error) => {
            toast.error("Server Error!");
            console.log(error);
        });
    };

    return (
        <div className="mt-5 pt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <Card className="premium-card border-0">
                            <CardHeader className="bg-white border-0">
                                <h3 className="fw-bold" style={{color: '#4e54c8'}}>Add New Category</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label className="text-muted small">Title</Label>
                                        <Input 
                                            type="text" 
                                            placeholder="Enter Title" 
                                            className="border-0 bg-light py-3"
                                            onChange={(e) => handleChange(e, 'title')}
                                            value={category.title}
                                        />
                                    </FormGroup>
                                    <FormGroup className="mt-3">
                                        <Label className="text-muted small">Description</Label>
                                        <Input 
                                            type="textarea" 
                                            placeholder="Enter Detail" 
                                            style={{ height: 150 }} 
                                            className="border-0 bg-light"
                                            onChange={(e) => handleChange(e, 'description')}
                                            value={category.description}
                                        />
                                    </FormGroup>
                                    <Container className="text-center mt-4">
                                        <Button className="btn-premium px-5">Add Category</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;