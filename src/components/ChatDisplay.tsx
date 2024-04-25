import React from 'react';
import '../style.css';

const ChatDisplay = ({ user, chatLInes }: any) => {
    return (
        <>
            <div className="displayStyle">
                <div className="innercontainer">
                    {chatLInes.map((chatLIne: any, index: any) => (
                        <div
                            key={index}
                            className={
                                chatLIne.data.userName == user.userName
                                    ? 'messagestyle'
                                    : 'reversemessage'
                            }
                            style={{
                                backgroundImage: `linear-gradient(#ffffff, ${chatLIne.data.color}) `,
                            }}
                        >
                            <p>
                                <small>
                                    <u>
                                        {chatLIne.data.userName}
                                        {chatLIne.data.userName == user.userName
                                            ? ' (you):'
                                            : ':'}
                                    </u>
                                </small>
                                <br />
                                {chatLIne.data.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
function Message({ member, data, id }: any, me: any) {
    const { username, color } = member.clientData;
    const messageFromMe = member.id === me.id;
    const className = '';
    return (
        <li key={id} className={className}>
            <span className="" style={{ backgroundColor: color }} />
            <div className="">
                <div className="">{username}</div>
                <div className="">{data}</div>
            </div>
        </li>
    );
}

export default ChatDisplay;
