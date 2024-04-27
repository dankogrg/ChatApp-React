import React, { useEffect, useRef, useState } from 'react';
import CreateUser from './fragments/CreateUser';
import ChatDisplay from './components/ChatDisplay';
import ChatInput from './fragments/ChatInput';
import { Container } from 'react-bootstrap';
import MemberDisplay from './components/MemberDisplay';
import TypingIndicator from './components/TypingIndicator';

let drone: any = null;

declare global {
    interface Window {
        Scaledrone: (a: any) => void;
    }
}
let Scaledrone = window.Scaledrone as any;

const App = () => {
    const [shownModal, setShownModal] = useState<Boolean>(true);
    const [user, setUser]: any = useState({});

    const [chatLines, setChatLInes]: any = useState([]);
    const [members, setMembers]: any = useState([]);

    const messagesRef: any = useRef();
    messagesRef.current = chatLines;
    const membersRef: any = useRef();
    membersRef.current = members;
    const meRef: any = useRef();

    function connectToScaledrone() {
        drone = new Scaledrone('7e11H1xcHoFAEHQc', {
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

            if (typeof data === 'object' && typeof data.typing === 'boolean') {
                const newMewmbers = [...membersRef.current];
                const index = newMewmbers.findIndex((m) => m.id === member.id);
                newMewmbers[index].typing = data.typing;
                setMembers(newMewmbers);
            } else {
                const messages = [...messagesRef.current, message];
                setChatLInes(messages);
                localStorage.setItem('chatLines', JSON.stringify(messages));
            }
        });
        room.on('members', (members: any) => {
            setMembers(members);
        });
        room.on('member_join', (member: any) => {
            setMembers([...membersRef.current, member]);
        });
        room.on('member_leave', ({ id }: any) => {
            const index = membersRef.current.findIndex((m: any) => m.id === id);
            const newMembers: any = [...membersRef.current];
            newMembers.splice(index, 1);
            setMembers(newMembers);
        });
    }

    useEffect(() => {
        setChatLInes(JSON.parse(localStorage.getItem('chatLines') ?? '[]'));
        const records = JSON.parse(localStorage.getItem('user')!);
        setUser(records ?? '{}');
        if (!records) {
            setShownModal(true);
        } else {
            setShownModal(false);
            meRef.current = records;

            if (drone === null) {
                connectToScaledrone();
            }
        }
    }, []);

    function onSendMessage(message: any) {
        drone.publish({
            room: 'observable-room',
            message,
        });
    }

    const makeUser = (user: any) => {
        meRef.current = user;
        if (drone === null) {
            connectToScaledrone();
        }
        localStorage.setItem('user', JSON.stringify(user));
    };

    function onChangeTypingState(isTyping: any) {
        drone.publish({
            room: 'observable-room',
            message: { typing: isTyping },
        });
    }

    const hideModal = () => setShownModal(false);

    return (
        <>
            <Container>
                <MemberDisplay members={members} user={user} />
                <ChatDisplay chatLInes={chatLines} user={user} />
                <TypingIndicator
                    members={members.filter(
                        (m: any) => m.typing && m.id !== user.id,
                    )}
                />
                <ChatInput
                    user={user}
                    onSendMessage={onSendMessage}
                    onChangeTypingState={onChangeTypingState}
                />
            </Container>
            <CreateUser
                connectToScaledrone={connectToScaledrone}
                shownModal={shownModal}
                hideModal={hideModal}
                makeUser={makeUser}
                onSendMessage={onSendMessage}
            />
        </>
    );
};

export default App;

