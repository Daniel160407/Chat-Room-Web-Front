// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import Chat from './Chat';

// eslint-disable-next-line react/prop-types
function User({ chatName, currentMembers}) {
    const [userName, setUserName] = useState('');
    const [socket, setSocket] = useState(null);

    function handleUserNameChange(newUserName) {
        setUserName(newUserName);
    }

    return (
        <>
            <ChatHeader chatName={chatName} onUserNameChange={handleUserNameChange} socket={socket}/>
            <Chat userName={userName} roomName={chatName} currentMembers={currentMembers} setWebSocket={setSocket}/>
        </>
    );
}

export default User;
