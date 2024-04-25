import React from 'react';
import '../style2.css';

const MemberDisplay = ({ members, user }: any) => {
    function Member({ id, clientData }: any, isMe: Boolean) {
        const { userName, color } = clientData;
        return (
            <div key={id} className="member">
                <div className="avatar" style={{ backgroundColor: color }} />
                <div className="username">
                    {userName} {isMe ? ' (you)' : ''}
                </div>
            </div>
        );
    }
    return (
        <div className="members">
            <div className="membersCount">
                {members.length} user{members.length === 1 ? '' : 's'} online
            </div>
            <div className="membersList">
                {members.map((m: any) => Member(m, m.id === user.id))}
            </div>
        </div>
    );
};

export default MemberDisplay;
