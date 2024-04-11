import React, { useState, useEffect } from 'react';
import '../styles/message.scss';

function Message({ message }) {
    const [isVisible, setIsVisible] = useState(message.type === 'Notification');
    const [isNotification, setIsNotification] = useState(message.type === 'Notification');

    useEffect(() => {
        if (message.type === 'Notification') {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

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
                    <h3 className='message'>{message.type === 'Notification' ? message.notification : null}</h3>
                </div>
            )}
            {(!isNotification && message.received) ?(
                <>
                <div className={'messageContainer ' + place}>
                    <h3>{message.sender!=='' ? message.sender : 'User'}: </h3>
                    <h3 className='message'>{message.message}</h3>
                </div>
                </>
            ):
                <div className={'messageContainer ' + place}>
                    <h3 className='message'>{message.message}</h3>
                </div>
            }
        </>
    );
}

export default Message;
