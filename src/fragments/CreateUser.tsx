import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';

const CreateUser = ({ shownModal, hideModal, makeUser }: any) => {
    const [userName, setUserName] = useState('');
    const [color, setColor] = useState('#ff0000');
    const date: string = String(
        parseInt(String(new Date().getTime() * Math.random())),
    );

    const [colorStatus, setColorStatus] = useState('empty');
    const [warning, setWarning] = useState('');

    const handleUserName = (e: any) => setUserName(e.target.value);
    const handleColor = (e: any) => {
        setColor(e.target.value);
        setColorStatus('full');
        console.log(colorStatus);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (colorStatus == 'empty') {
            setWarning('Please pick a background color!');
            return;
        }
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
                        label="* Username"
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
                        <b>* Choose color</b>
                    </Form.Label>
                    <div style={{ display: 'flex', verticalAlign: 'middle' }}>
                        <Form.Control
                            type="color"
                            className="form-control form-control-color"
                            onChange={handleColor}
                            value={color}
                            required
                        />
                        <p
                            style={{
                                color: '#ff0000',
                                margin: 'auto ',
                                marginLeft: '7px',
                            }}
                        >
                            {warning}
                        </p>
                    </div>
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
