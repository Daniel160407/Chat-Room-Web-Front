import React, { useState, useEffect } from 'react';
import '../styles/roomsList.scss'

function RoomsList(){
    const [rooms, setRooms] = useState([]);

    useEffect(()=>{
        fetch('/ChatRoom/room')
        .then(response=>response.json())
        .then(data=>{
            setRooms(data.name);
            console.log("gello");
        });
    },[]);

    return (
        <div id='roomsList'>
            <div id='container'>
                <div>
                    <button id='addRoomButton'>Add Room</button>
                </div>
                <div id='rooms'>
                    {rooms.map(room=>(
                        <div className='room' key={room.id}>
                            {room.name}
                            <div>
                                {room.maxMembers}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoomsList;