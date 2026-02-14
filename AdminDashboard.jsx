import React from 'react';
import { Container, Card, CardBody } from 'reactstrap';

const AdminDashboard = () => {
    return (
        <Container className="mt-5 pt-5">
            <Card className="premium-card p-4">
                <CardBody className="text-center">
                    <h2 className="text-primary">Admin Dashboard</h2>
                    <p className="text-muted">Manage categories, quizzes, and questions here.</p>
                    {/* Add sidebar or grid buttons here later */}
                </CardBody>
            </Card>
        </Container>
    );
};
export default AdminDashboard;