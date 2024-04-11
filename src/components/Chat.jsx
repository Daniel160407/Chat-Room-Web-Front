import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat.scss';
import Message from './Message';

function Chat() {
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const chatRef = useRef(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/ChatRoom/chatEndpoint');

        newSocket.onopen = function(event) {
            console.log('WebSocket connected');
        };

        newSocket.onmessage = function(event) {
            console.log('Received message:', event.data);
            const message = JSON.parse(event.data);
            message.received = true;
            setMessages(prevMessages => [...prevMessages, message]);
        };

        newSocket.onerror = function(event) {
            console.error('WebSocket error:', event);
        };

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    function sendMessage() { //Requiers bug fix with message sending
        if (messageText.trim() !== '' && socket) {
            const messageObject = {
                type: 'PublicMessage',
                message: messageText
            };
            socket.send(JSON.stringify(messageObject));
            messageObject.received=false;
            setMessages(prevMessages => [...prevMessages, messageObject]);
            setMessageText('');
        }
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);
    
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            console.log("value: "+event.target.value);
            setMessageText(event.target.value);
            sendMessage();
            event.target.value='';
        }
    }

    return (
        <div id='room'>
            <div id='chat' ref={chatRef}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
            </div>
            <div id='textInput'>
                <input
                    type='text'
                    placeholder='Write something'
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}

export default Chat;