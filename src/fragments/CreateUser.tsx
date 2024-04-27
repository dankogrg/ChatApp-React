import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

const CreateUser = ({ shownModal, hideModal, makeUser }: any) => {
    const [userName, setUserName] = useState('');
    const [color, setColor] = useState('#0000ff');
    const date: string = String(
        parseInt(String(new Date().getTime() * Math.random())),
    );

    const handleUserName = (e: any) => setUserName(e.target.value);
    const handleColor = (e: any) => setColor(e.target.value);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const member = {
            userName: userName,
            color: color,
            userId: date,
        };
        makeUser(member);
        hideModal();
    };

    return (
        <Modal show={shownModal} onHide={hideModal} backdrop="static">
            <Modal.Header>
                <Modal.Title>Create username</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingUserName"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            onChange={handleUserName}
                            value={userName}
                            required
                        />
                    </FloatingLabel>
                    <Form.Label id="color" className="mb-3">
                        Choose color
                    </Form.Label>
                    <Form.Control
                        type="color"
                        className="mb-3"
                        onChange={handleColor}
                        value={color}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreateUser;
