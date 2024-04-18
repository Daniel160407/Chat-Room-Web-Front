// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import '../styles/chatHeader.scss';
import Header from './Header';
import RoomsList from './RoomsList';
import root from '../script/root';

// eslint-disable-next-line react/prop-types
function ChatHeader({chatName, onUserNameChange, socket}) {
    const [leaveChat, setLeaveChat] = useState(false);
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

    async function leave() {
        socket.close();
        await new Promise(resolve => setTimeout(resolve, 50));
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
