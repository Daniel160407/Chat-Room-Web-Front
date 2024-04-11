import React, { useState } from 'react';
import '../styles/chatHeader.scss';

function ChatHeader({chatName, onUserNameChange }) {
    const [isProfileVisible, setProfileVisible] = useState(false);

    function toggleProfileVisible() {
        setProfileVisible(!isProfileVisible);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            const newUserName = event.target.value;
            onUserNameChange(newUserName);
            event.target.value = '';
            setProfileVisible(false);
        }
    }

    return (
        <div className="chatHeader">
            <div id='profile'>
                <img id='profileImg' src='/images/profileImg.jpeg' alt='profile image' onClick={toggleProfileVisible} />
            </div>
            <div>
                <h1>{chatName}</h1>
            </div>
            <div id='profileSettings' className={isProfileVisible ? 'visible' : 'invisible'}>
                <div>
                    <h3>Change Name</h3>
                    <input id='userName' type='text' onKeyPress={handleKeyPress}></input>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
