import React, { useEffect, useState } from 'react';
import '../styles/roomsList.scss';
import root from '../script/root';
import User from './User';
import axios from 'axios';

function RoomsList() {
    const [jsonArray, setJsonArray] = useState(null);
    const [currentMembers, setCurrentMembers] = useState(0);
    const [isAddRoomWindowVisible, setAddRoomWindowVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/ChatRoom/room')
        .then(response => {
            setJsonArray(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        axios.get('http://localhost:8080/ChatRoom/roomMembers')
        .then(response => {
            setCurrentMembers(response)
            console.log(response);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    function enterRoom(roomName) {
        root.render(
            <>
                <User chatName={roomName}/>
            </>
        );
    }

    function showAddRoomWindow() {
        setAddRoomWindowVisible(!isAddRoomWindowVisible);
    }

    function addRoom() {
        fetch(`http://localhost:8080/ChatRoom/room?name=${document.getElementById('name').value}&maxMembers=${document.getElementById('maxMembers').value}`,{method:'POST'})
        .then(response => response.json())
        .then(data => {
            console.log("Posts data: "+data);
        })
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
                            <div className='room' key={index} onClick={() => enterRoom(room.name)}>
                                <h1>{room.name}</h1>
                                <h3>{room.currentMembers} / {room.maxMembers}</h3>
                                <h3>{currentMembers[index]}</h3>
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
                        <h2>Add New Room</h2>
                        <form id='addRoomForm' onSubmit={addRoom}>
                            <h3>Room Name:</h3>
                            <input id='name' type='text' />
                            <h3>Maximum Members:</h3>
                            <input id='maxMembers' type='text' />
                            <button type='submit'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomsList;
