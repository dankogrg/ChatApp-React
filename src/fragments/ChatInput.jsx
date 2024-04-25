import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import TypingIndicator from 'typing-indicator';

let typingIndicator = null;

const ChatInput = ({ user, onSendMessage, onChangeTypingState }) => {
    const inputStyle = {
        height: '10vh',
        display: 'flex',
        verticalAlign: 'middle',
        marginTop: '10px',
    };

    const { userName, color } = user;
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (typingIndicator === null) {
            typingIndicator = new TypingIndicator();
            typingIndicator.listen((isTyping) => onChangeTypingState(isTyping));
        }
    });

    const handleMessage = (e) => {
        const text = e.target.value;
        typingIndicator.onChange(text);
        setMessage(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (e.key != 'Enter' && e.key != undefined) return;
        if (!message.trim()) {
            setMessage('');
            return;
        }
        const chatLIne = {
            userName: userName,
            color: color,
            message: message,
        };
        setMessage('');

        onSendMessage(chatLIne);
    };

    return (
        <>
            <Form
                style={inputStyle}
                onSubmit={handleSubmit}
                onKeyUp={handleSubmit}
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
