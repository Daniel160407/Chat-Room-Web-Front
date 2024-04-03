import React, { useState } from 'react';
import '../styles/chatHeader.scss';
import RoomsList from './RoomsList';
import root from '../script/root';
import Header from './Header';

function ChatHeader({ chatName }) {
    const [leaveChat, setLeaveChat] = useState(false);
    const [isProfileVisible, setProfileVisible] = useState(false);

    function toggleProfileVisible() {
        setProfileVisible(!isProfileVisible);
    }

    function leave() {
        setLeaveChat(true);
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
                    <input id='userName' type='text'></input>
                </div>
                <div>
                    <button onClick={leave}>Leave Chat</button>
                    {leaveChat && (
                        root.render(
                            <React.StrictMode>
                                <Header/>
                                <RoomsList/>
                            </React.StrictMode>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
