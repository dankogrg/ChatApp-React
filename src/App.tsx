import React, { useEffect, useRef, useState } from 'react';
import CreateUser from './fragments/CreateUser';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './fragments/ChatInput';
import { Container } from 'react-bootstrap';
import MemberDisplay from './components/MemberDisplay';

let drone: any = null;

const App = () => {
    const [shownModal, setShownModal] = useState<Boolean>(true);
    const [user, setUser]: any = useState({
        userName: 'Danko',
        color: 'ff0000',
    });
    const [chatLines, setChatLInes]: any = useState([]);
    const [members, setMembers]: any = useState([]);

    const messagesRef: any = useRef();
    messagesRef.current = chatLines;
    const membersRef: any = useRef();
    membersRef.current = members;
    const meRef: any = useRef();
    meRef.current = user;

    function connectToScaledrone() {
        drone = new window.Scaledrone('7e11H1xcHoFAEHQc', {
            data: meRef.current,
        });
        drone.on('open', (error: any) => {
            if (error) {
                return console.error(error);
            }
            meRef.current.id = drone.clientId;
            setUser(meRef.current);
        });

        const room = drone.subscribe('observable-room');

        room.on('message', (message: any) => {
            const { data, member } = message;
            setChatLInes([...messagesRef.current, message]);
        });
        room.on('members', (members: any) => {
            setMembers(members);
        });
        room.on('member_join', (member: any) => {
            setMembers([...membersRef.current, member]);
            console.log(member);
        });
        room.on('member_leave', ({ id }: any) => {
            const index = membersRef.current.findIndex((m: any) => m.id === id);
            const newMembers: any = [...membersRef.current];
            newMembers.splice(index, 1);
            setMembers(newMembers);
        });
    }

    useEffect(() => {
        setChatLInes(JSON.parse(localStorage.getItem('chatLines')! ?? '[]'));
        const records = JSON.parse(localStorage.getItem('user')!);
        setUser(records ?? {});

        if (!records) {
            setShownModal(true);
        } else {
            setShownModal(false);
            if (drone === null) {
                connectToScaledrone();
            }
        }
        if (drone === null) {
            connectToScaledrone();
        }
    }, []);

    function onSendMessage(message: any) {
        drone.publish({
            room: 'observable-room',
            message,
        });
    }

    const makeUser = (membera: any) => {
        setUser(membera);

        // localStorage.setItem('user', JSON.stringify(member));
    };
    const triggerScalderone = () => {
        if (drone === null) {
            connectToScaledrone();
        }
    };

    const makeMessages = (chatLines: any) => {
        setChatLInes(chatLines);

        // localStorage.setItem('chatLines', JSON.stringify(chatLines));
    };

    const hideModal = () => setShownModal(false);

    return (
        <>
            <Container>
                <MemberDisplay members={members} user={user} />
                <ChatDisplay chatLInes={chatLines} user={user} />
                <ChatInput
                    makeMessages={makeMessages}
                    user={user}
                    chatLines={chatLines}
                    onSendMessage={onSendMessage}
                />
            </Container>
            <CreateUser
                connectToScaledrone={connectToScaledrone}
                shownModal={shownModal}
                hideModal={hideModal}
                makeUser={makeUser}
                triggerScalderone={triggerScalderone}
                onSendMessage={onSendMessage}
            />
        </>
    );
};

export default App;

