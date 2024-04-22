import React, { useEffect, useState } from 'react';
import CreateUser from './fragments/CreateUser';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './fragments/ChatInput';
import { Container } from 'react-bootstrap';

const App = () => {
    const [shownModal, setShownModal] = useState<Boolean>(true);
    const [user, setUser] = useState({});

    const [chatLines, setChatLInes] = useState([]);
    console.log(user);

    useEffect(() => {
        setChatLInes(JSON.parse(localStorage.getItem('chatLines') ?? '[]'));
        setUser(JSON.parse(localStorage.getItem('user') ?? '[]'));
    }, []);

    const makeUser = (user: any) => {
        setUser(user);
        console.log(user);

        localStorage.setItem('user', JSON.stringify(user));
    };
    const makeMessages = (chatLines: any) => {
        setChatLInes(chatLines);

        localStorage.setItem('chatLines', JSON.stringify(chatLines));
    };

    const hideModal = () => setShownModal(false);

    return (
        <>
            <Container>
                <ChatDisplay chatLInes={chatLines} user={user} />
                <ChatInput
                    makeMessages={makeMessages}
                    user={user}
                    chatLines={chatLines}
                />
            </Container>
            <CreateUser
                shownModal={shownModal}
                hideModal={hideModal}
                user={user}
                makeUser={makeUser}
            />
        </>
    );
};

export default App;

