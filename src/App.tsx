import React, { useEffect, useState } from 'react';
import CreateUser from './fragments/CreateUser';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './fragments/ChatInput';
import { Container } from 'react-bootstrap';

const App = () => {
    const [shownModal, setShownModal] = useState<Boolean>(true);
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [chatLines, setChatLInes] = useState<Array<Object>>([]);

    useEffect(() => {
        setChatLInes(JSON.parse(localStorage.getItem('chatLInes') ?? '[]'));
    }, []);

    const makeUser = (user: any) => setUser(user);
    const makeMessages = (chatLines: any) => {
        setChatLInes(chatLines);

        localStorage.setItem('chatLInes', JSON.stringify(chatLines));
    };

    const hideModal = () => setShownModal(false);

    return (
        <>
            <CreateUser
                shownModal={shownModal}
                hideModal={hideModal}
                user={user}
                makeUser={makeUser}
            />
            <Container>
                <ChatDisplay chatLInes={chatLines} user={user} />
                <ChatInput
                    makeMessages={makeMessages}
                    messages={messages}
                    user={user}
                    chatLInes={chatLines}
                />
            </Container>
        </>
    );
};

export default App;

