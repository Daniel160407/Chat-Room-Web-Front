import React, {useEffect, useState} from 'react';
import '../styles/chatHeader.scss';
import Header from './Header';
import RoomsList from './RoomsList';
import root from '../script/root';

// eslint-disable-next-line react/prop-types
function ChatHeader({chatName, onUserNameChange, currentMembers}) {
    const [leaveChat, setLeaveChat] = useState(false);
    const [isProfileVisible, setProfileVisible] = useState(false);

    useEffect(() => {
        console.log(chatName);
        console.log(currentMembers);
        console.log(typeof currentMembers);
        console.log(currentMembers + 1);
        fetch(`http://localhost:8080/ChatRoom/roomMembers?roomName=${chatName}&currentMembers=${currentMembers + 1}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => console.log(data));
    }, []);

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

    function leave() {
        setLeaveChat(true);
    }

    return (
        <div className="chatHeader">
            <div id='profile'>
                <img id='profileImg' src='/images/profileImg.jpeg' alt='profile image' onClick={toggleProfileVisible}/>
            </div>
            <div>
                <h1>{chatName}</h1>
            </div>
            <div id='profileSettings' className={isProfileVisible ? 'visible' : 'invisible'}>
                <div>
                    <h3>Change Name</h3>
                    <input id='userName' type='text' onKeyPress={handleKeyPress}></input>
                    <div>
                        <button id='leaveBtn' onClick={leave}>Leave Chat</button>
                        {leaveChat && (
                            root.render(
                                <>
                                    <Header/>
                                    <RoomsList/>
                                </>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
