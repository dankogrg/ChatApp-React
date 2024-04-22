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
                                chatLIne.userName == user.userName
                                    ? 'messagestyle'
                                    : 'reversemessage'
                            }
                            style={{
                                backgroundImage: `linear-gradient(#ffffff, ${chatLIne.color}) `,
                            }}
                        >
                            <p>
                                <small>
                                    <u>{chatLIne.userName + ':'}</u>
                                </small>
                                <br />
                                {chatLIne.message}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChatDisplay;
