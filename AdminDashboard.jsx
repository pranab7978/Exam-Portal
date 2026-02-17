import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { FaListAlt, FaQuestionCircle, FaClipboardList, FaUsers, FaCog } from 'react-icons/fa';
import './AdminDashboard.css'; // We will create this file next

const AdminDashboard = () => {
    // Configuration for your dashboard cards
    const dashboardItems = [
        { 
            title: "Categories", 
            text: "Manage quiz topics", 
            icon: <FaListAlt />, 
            color: "primary",
            btnText: "View Categories"
        },
        { 
            title: "Quizzes", 
            text: "Create and edit quizzes", 
            icon: <FaClipboardList />, 
            color: "success",
            btnText: "Manage Quizzes"
        },
        { 
            title: "Questions", 
            text: "Add new questions to bank", 
            icon: <FaQuestionCircle />, 
            color: "warning",
            btnText: "Edit Questions"
        },
        { 
            title: "Users", 
            text: "Monitor student progress", 
            icon: <FaUsers />, 
            color: "info",
            btnText: "View Users"
        },
    ];

    return (
        <div className="dashboard-wrapper">
            <Container className="py-5">
                {/* Header Section */}
                <div className="dashboard-header mb-5 text-center">
                    <h1 className="display-4 fw-bold">Admin Dashboard</h1>
                    <p className="lead text-muted">Welcome back! Select an area to manage.</p>
                </div>

                {/* Dashboard Grid */}
                <Row>
                    {dashboardItems.map((item, index) => (
                        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
                            <Card className={`h-100 shadow-sm border-0 dashboard-card card-hover-${item.color}`}>
                                <CardBody className="d-flex flex-column align-items-center text-center">
                                    <div className={`icon-circle bg-light-${item.color} text-${item.color} mb-3`}>
                                        {item.icon}
                                    </div>
                                    <CardTitle tag="h5" className="fw-bold mb-2">{item.title}</CardTitle>
                                    <CardText className="text-muted small mb-4 flex-grow-1">
                                        {item.text}
                                    </CardText>
                                    <Button color={item.color} outline className="rounded-pill px-4 w-100 fw-bold">
                                        {item.btnText}
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;