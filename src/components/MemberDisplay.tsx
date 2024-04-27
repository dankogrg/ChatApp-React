import React from 'react';
import '../style2.css';

const MemberDisplay = ({ members, user }: any) => {
    return (
        <div className="members">
            <div className="membersCount">
                {members.length} user{members.length === 1 ? '' : 's'} online
            </div>
            <div className="membersList">
                {members.map((m: any) => (
                    <div key={m.id} className="member">
                        <div
                            className="avatar"
                            style={{ backgroundColor: m.clientData.color }}
                        />
                        <div className="username">
                            {m.clientData.userName}{' '}
                            {m.clientData.userId == user.userId ? ' (you)' : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberDisplay;
