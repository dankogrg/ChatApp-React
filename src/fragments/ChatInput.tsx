import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ChatInput = ({ user, onSendMessage }: any) => {
    const inputStyle = {
        height: '10vh',
        display: 'flex',
        verticalAlign: 'middle',
        marginTop: '10px',
    };

    const { userName, color } = user;
    const [message, setMessage] = useState('');

    const handleMessage = (e: any) => {
        setMessage(e.target.value);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (e.key != 'Enter' && e.key != undefined) return;
        if (!message.trim()) {
            setMessage('');
            return;
        }
        const chatLIne: Object = {
            userName: userName,
            color: color,
            message: message,
        };

        onSendMessage(chatLIne);

        setMessage('');
    };

    return (
        <>
            <Form
                style={inputStyle}
                onSubmit={handleSubmit}
                onKeyUpCapture={handleSubmit}
            >
                <Form.Label id="message" className="mb-3"></Form.Label>
                <Form.Control
                    as="textarea"
                    rows={1}
                    style={{
                        border: 'solid 2px blue',
                        width: '80vw',
                    }}
                    onChange={handleMessage}
                    value={message}
                ></Form.Control>
                <Button
                    style={{
                        margin: '20px',
                        width: '10vw',
                    }}
                    variant="primary"
                    type="submit"
                >
                    Send
                </Button>
            </Form>
        </>
    );
};

export default ChatInput;
