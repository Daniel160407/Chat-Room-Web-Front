import React from 'react';
import '../styles/message.scss'; // Assuming you have a CSS file named message.scss

function Message({ message }) {
    let place;
    if (message.received === true) {
        console.log("received: "+message.message);
        place = 'receivedMessage';
    } else {
        console.log("sent: "+message.message);
        place = 'sentMessage'; // Ensure that place is initialized with an empty string if message.received is false
    }
    return (
        <div className={"messageContainer " + place}>
            <h3 className='message'>{message.message}</h3> {/* Assuming message is an object with a 'message' property */}
        </div>
    );
}

export default Message;
