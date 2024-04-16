import React, { useState, useEffect, useRef } from 'react';
import '../styles/chat.scss';
import Message from './Message';
import axios from 'axios';

function Chat({ userName, roomName, currentMembers, setWebSocket }) {
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const chatRef = useRef(null);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/ChatRoom/chatEndpoint');

        newSocket.onopen = function () {
            console.log('WebSocket connected');
            setWebSocket(newSocket);
        };

        newSocket.onmessage = function (event) {
            console.log('Received message:', event.data);
            const message = JSON.parse(event.data);
            if (event.roomName === roomName) {
                message.received = true;
                setMessages(prevMessages => [...prevMessages, message]);
            }
        };

        newSocket.onclose = function () {
            axios.put(`http://localhost:8080/ChatRoom/roomMembers?roomName=${roomName}&currentMembers=${parseInt(currentMembers)}`);
        };

        newSocket.onerror = function (event) {
            console.error('WebSocket error:', event);
        };

        setSocket(newSocket);

        window.onbeforeunload = () => {
            axios.put(`http://localhost:8080/ChatRoom/roomMembers?roomName=${roomName}&currentMembers=${parseInt(currentMembers)}`);
        }
    }, []);

    function handleUnload() {
        if (socket) {
            axios.put(`http://localhost:8080/ChatRoom/roomMembers?roomName=${roomName}&currentMembers=${parseInt(currentMembers)}`);
            socket.close();
        }
    }

    function sendMessage() {
        if (messageText.trim() !== '' && socket) {
            const messageObject = {
                type: 'PublicMessage',
                roomName: roomName,
                sender: userName,
                message: messageText
            };
            socket.send(JSON.stringify(messageObject));
            messageObject.received = false;
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
            setMessageText(event.target.value);
            sendMessage();
            event.target.value = '';
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
