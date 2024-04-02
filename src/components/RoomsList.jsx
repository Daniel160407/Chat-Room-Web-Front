import React, { useEffect, useState } from 'react';
import '../styles/roomsList.scss';

function RoomsList() {
    const [jsonArray, setJsonArray] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/ChatRoom/room')
            .then(response => response.json())
            .then(data => {
                setJsonArray(data);
                console.log(data);
            });
    }, []);

    return (
        <div id='roomsList'>
            <div id='container'>
                <div>
                    <button id='addRoomButton'>Add Room</button>
                </div>
                <div id='rooms'>
                    {jsonArray ? (
                        jsonArray.map((room, index) => (
                            <div key={index}>
                                <h1>{room.name}</h1>
                                <h3>{room.maxMembers}</h3>
                            </div>
                        ))
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomsList;