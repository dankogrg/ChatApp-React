import React from 'react';
import '../style2.css';

const TypingIndicator = ({ members }: any) => {
    const names = members.map((m: any) => m.clientData.userName);
    if (names.length === 0) {
        return <div className="typingIndicator"></div>;
    }
    // 2
    if (names.length === 1) {
        return <div className="typingIndicator">{names[0]} is typing</div>;
    }
    const string = names.slice(0, -1).join(', ') + ' and ' + names.slice(-1);
    return <div className={'typingIndicator'}>{string} are typing</div>;
};

export default TypingIndicator;
