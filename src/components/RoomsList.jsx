import React, { useEffect, useState } from 'react';
import '../styles/roomsList.scss';
import root from '../script/root';
import Chat from './Chat';
import ChatHeader from './ChatHeader';

function RoomsList() {
    const [jsonArray, setJsonArray] = useState(null);
    const [isAddRoomWindowVisible,setAddRoomWindowVisible] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/ChatRoom/room')
            .then(response => response.json())
            .then(data => {
                setJsonArray(data);
                console.log(data);
            });
    }, []);

    

    async function enterRoom(roomId,roomName){
        root.render(
            <React.StrictMode>
                <ChatHeader chatName={roomName}/>
                <Chat/>
            </React.StrictMode>
        );
    }

    function showAddRoomWindow(){
        console.log("WOWJDKOHSKDGAJKSDBVJSBADJSHBDASBDBASHDS");
        console.log(isAddRoomWindowVisible);
        setAddRoomWindowVisible(!isAddRoomWindowVisible);
    }

    return (
        <div id='roomsList'>
            <div id='container'>
                <div>
                    <button id='addRoomButton' onClick={showAddRoomWindow}>Add Room</button>
                </div>
                <div id='rooms'>
                    {jsonArray ? (
                        jsonArray.map((room, index) => (
                            <div className='room' key={index} onClick={() => enterRoom(room.id,room.name)} >
                                <h1>{room.name}</h1>
                                <h3>{room.maxMembers}</h3>
                            </div>
                        ))
                    ) : (
                        <div id='loadingWindow'>
                            <div className='loader'></div>
                        </div>
                    )}
                </div>
                <div id='addRoomWindow'>
                    <div id='addRoomMenu' className={isAddRoomWindowVisible ? 'visible' : 'invisible'}>
                        <h1>{isAddRoomWindowVisible ? 'visible' : 'invisible'}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomsList;