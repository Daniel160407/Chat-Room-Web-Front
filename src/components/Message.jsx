import React, { useState, useEffect } from 'react';
import '../styles/message.scss';

function Message({ message }) {
    const [isVisible, setIsVisible] = useState(message.type === 'Notification');

    useEffect(() => {
        if (message.type === 'Notification') {
            // Set a timer to hide the notification after 3 seconds
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            // Clean up the timer when the component unmounts or when the message changes
            return () => clearTimeout(timer);
        }
    }, [message]);

    let place;
    if (message.received === true) {
        if (message.type === 'Notification') {
            place = 'notification';
        } else {
            place = 'receivedMessage';
        }
    } else {
        place = 'sentMessage';
    }

    return (
        <>
            {isVisible && (
                <div className={"messageContainer " + place}>
                    <h3 className='message'>{message.type === 'Notification' ? message.notification : message.message}</h3>
                </div>
            )}
        </>
    );
}

export default Message;
