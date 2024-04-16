// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import '../styles/roomsList.scss';
import root from '../script/root';
import User from './User';
import axios from 'axios';

function RoomsList() {
    const [jsonArray, setJsonArray] = useState(null);
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
    }, []);

    function enterRoom(roomName) {
        const currentMembersElement = document.getElementById(roomName).querySelector('.currentMembers');
        const currentMembers = currentMembersElement ? currentMembersElement.innerText : '';

        fetch(`http://localhost:8080/ChatRoom/roomMembers?roomName=${roomName}&currentMembers=${parseInt(currentMembers) + 1}`, {method: 'PUT'})
            .then(response => response.json())
            .then(data => console.log(data));

        root.render(
            <>
                <User chatName={roomName} currentMembers={currentMembers}/>
            </>
        );
    }

    function showAddRoomWindow() {
        setAddRoomWindowVisible(!isAddRoomWindowVisible);
    }

    function addRoom() {
        fetch(`http://localhost:8080/ChatRoom/room?name=${document.getElementById('name').value}&maxMembers=${document.getElementById('maxMembers').value}`, {method: 'POST'})
            .then(response => response.json())
            .then(data => {
                console.log("Posts data: " + data);
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
                            <div id={room.name} className='room' key={index} onClick={() => enterRoom(room.name)}>
                                <h1>{room.name}</h1>
                                <div><h3 className='currentMembers'>{room.currentMembers}</h3>
                                    <h3>/{room.maxMembers}</h3></div>
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
                            <input id='name' type='text'/>
                            <h3>Maximum Members:</h3>
                            <input id='maxMembers' type='text'/>
                            <button type='submit'>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomsList;
