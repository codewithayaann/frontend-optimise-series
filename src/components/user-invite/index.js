import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { inviteUser } from '../../service/user';

export const UserInvite = () => {
    const [numberOfInputs, setNumberOfInputs] = useState(0);
    const [emails, setEmails] = useState([]);
    const [apiResponse, setApiResponse] = useState(null);

    const handleInputChange = (event) => {
        if (event.key === 'Enter') {
            const num = parseInt(event.target.value, 10);
            setNumberOfInputs(num);
            setEmails(Array(num).fill('').map((_, index) => `user-${index + 1}@example.com`));
        }
    };

    const handleEmailChange = (event, index) => {
        const newEmails = [...emails];
        newEmails[index] = event.target.value;
        setEmails(newEmails);
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        inviteUser(emails)
    };

    return (
        <Container>
            <Row className='mt-4 d-flex px-2'>
                <Col xs={12}>
                    <h2>Invite Users</h2>
                    <InputGroup className='mt-3'>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of inputs"
                            onKeyPress={handleInputChange}
                        />
                    </InputGroup>

                    {numberOfInputs > 0 && (
                        <Form onSubmit={handleSubmit}>
                            <section className='mt-4 mb-4'>
                                <Button variant="primary" type="submit">
                                    Send Invite
                                </Button>
                            </section>
                            <Row>
                                {emails.map((email, index) => (
                                    <Col xs={6} className='mb-3'>
                                        <Form.Group key={index}>
                                            <Form.Label>User {index + 1}</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(event) => handleEmailChange(event, index)}
                                            />
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserInvite;