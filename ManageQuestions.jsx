import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Container, Row, Col, Card, CardBody, Button, 
    Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input 
} from "reactstrap";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { addQuestion, deleteQuestion, getQuestionsOfQuizAdmin, updateQuestion } from "../../services/question-service";

const ManageQuestions = () => {
    const { qid, title } = useParams();
    const navigate = useNavigate();
    
    const [questions, setQuestions] = useState([]);
    const [modal, setModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    // FIX: Parse qid as a Number to ensure Spring Boot saves it correctly
    const [currentQuestion, setCurrentQuestion] = useState({
        content: '', option1: '', option2: '', option3: '', option4: '', answer: '', quizId: Number(qid)
    });

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = () => {
        getQuestionsOfQuizAdmin(qid).then((data) => {
            setQuestions(data);
        }).catch(err => toast.error("Error loading questions"));
    };

    const toggle = () => {
        setModal(!modal);
        if(!modal) {
            if(!isUpdate) {
                setCurrentQuestion({ content: '', option1: '', option2: '', option3: '', option4: '', answer: '', quizId: Number(qid) });
            }
        } else {
            setIsUpdate(false); 
        }
    };

    const handleInputChange = (e, field) => {
        setCurrentQuestion({ ...currentQuestion, [field]: e.target.value });
    };

    const openAddModal = () => {
        setIsUpdate(false);
        setCurrentQuestion({ content: '', option1: '', option2: '', option3: '', option4: '', answer: '', quizId: Number(qid) });
        setModal(true);
    };

    const openEditModal = (q) => {
        setIsUpdate(true);
        setCurrentQuestion(q);
        setModal(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if(!currentQuestion.content || !currentQuestion.answer) {
            toast.error("Content and Answer are required");
            return;
        }

        if(isUpdate) {
            updateQuestion(currentQuestion).then(res => {
                toast.success("Question Updated!");
                loadQuestions();
                toggle();
            }).catch(err => toast.error("Error updating"));
        } else {
            addQuestion(currentQuestion).then(res => {
                toast.success("Question Added!");
                loadQuestions();
                toggle();
            }).catch(err => toast.error("Error adding"));
        }
    };

    const handleDelete = (qId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteQuestion(qId).then(() => {
                    toast.success("Deleted Successfully");
                    loadQuestions();
                }).catch(err => toast.error("Error deleting"));
            }
        });
    };

    return (
        <div className="bg-light min-vh-100 pt-5">
            <Container>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Button color="secondary" onClick={() => navigate('/admin/dashboard')}>
                        <FaArrowLeft className="me-2"/> Back
                    </Button>
                    <h2 className="text-primary fw-bold">Manage Questions: {title}</h2>
                    <Button color="primary" onClick={openAddModal}>
                        <FaPlus className="me-2"/> Add New Question
                    </Button>
                </div>

                <Card className="border-0 shadow-sm">
                    <CardBody>
                        {questions.length > 0 ? (
                            questions.map((q, index) => (
                                <Card key={index} className="mb-3 border border-light shadow-sm">
                                    <CardBody>
                                        <Row>
                                            <Col md={10}>
                                                <h5>Q{index+1}: <span dangerouslySetInnerHTML={{__html: q.content}}></span></h5>
                                                <div className="row mt-3">
                                                    <div className="col-md-6 text-muted">A) {q.option1}</div>
                                                    <div className="col-md-6 text-muted">B) {q.option2}</div>
                                                    <div className="col-md-6 text-muted">C) {q.option3}</div>
                                                    <div className="col-md-6 text-muted">D) {q.option4}</div>
                                                </div>
                                                <div className="mt-2 text-success fw-bold">Correct Answer: {q.answer}</div>
                                            </Col>
                                            <Col md={2} className="d-flex flex-column justify-content-center gap-2">
                                                <Button color="warning" size="sm" onClick={() => openEditModal(q)}>
                                                    <FaEdit/> Edit
                                                </Button>
                                                <Button color="danger" size="sm" onClick={() => handleDelete(q.quesId)}>
                                                    <FaTrash/> Delete
                                                </Button>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center p-5 text-muted">No questions found. Add one!</div>
                        )}
                    </CardBody>
                </Card>

                <Modal isOpen={modal} toggle={toggle} size="lg">
                    <ModalHeader toggle={toggle}>{isUpdate ? 'Update Question' : 'Add New Question'}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <Label>Question Content</Label>
                                <Input type="textarea" rows="3" value={currentQuestion.content} onChange={(e)=>handleInputChange(e,'content')} />
                            </FormGroup>
                            <Row>
                                <Col md={6}><FormGroup><Label>Option 1</Label><Input value={currentQuestion.option1} onChange={(e)=>handleInputChange(e,'option1')} /></FormGroup></Col>
                                <Col md={6}><FormGroup><Label>Option 2</Label><Input value={currentQuestion.option2} onChange={(e)=>handleInputChange(e,'option2')} /></FormGroup></Col>
                                <Col md={6}><FormGroup><Label>Option 3</Label><Input value={currentQuestion.option3} onChange={(e)=>handleInputChange(e,'option3')} /></FormGroup></Col>
                                <Col md={6}><FormGroup><Label>Option 4</Label><Input value={currentQuestion.option4} onChange={(e)=>handleInputChange(e,'option4')} /></FormGroup></Col>
                            </Row>
                            <FormGroup>
                                <Label>Correct Answer</Label>
                                <Input type="select" value={currentQuestion.answer} onChange={(e)=>handleInputChange(e,'answer')}>
                                    <option value="">Select Answer</option>
                                    {currentQuestion.option1 && <option value={currentQuestion.option1}>{currentQuestion.option1}</option>}
                                    {currentQuestion.option2 && <option value={currentQuestion.option2}>{currentQuestion.option2}</option>}
                                    {currentQuestion.option3 && <option value={currentQuestion.option3}>{currentQuestion.option3}</option>}
                                    {currentQuestion.option4 && <option value={currentQuestion.option4}>{currentQuestion.option4}</option>}
                                </Input>
                            </FormGroup>
                            <Container className="text-center">
                                <Button color="primary" className="px-4">{isUpdate ? 'Update' : 'Add'}</Button>
                            </Container>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
        </div>
    );
};

export default ManageQuestions;