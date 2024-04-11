import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import Chat from './Chat';

function User({chatName}) {
    const [userName, setUserName] = useState('');

    function handleUserNameChange(newUserName) {
        setUserName(newUserName);
    }

    return (
        <>
            <ChatHeader chatName={chatName} onUserNameChange={handleUserNameChange} />
            <Chat userName={userName} />
        </>
    );
}

export default User;
