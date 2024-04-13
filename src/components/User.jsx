// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import Chat from './Chat';

// eslint-disable-next-line react/prop-types
function User({ chatName }) {
    const [userName, setUserName] = useState('');
    const [currentMembers, setCurrentMembers] = useState(0);

    function handleUserNameChange(newUserName) {
        setUserName(newUserName);
    }

    return (
        <>
            <ChatHeader chatName={chatName} onUserNameChange={handleUserNameChange} currentMembers={currentMembers} />
            <Chat userName={userName} setCurrentMembers={setCurrentMembers} />
        </>
    );
}

export default User;
