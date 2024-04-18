// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useRef} from 'react';
import '../styles/chat.scss';
import Message from './Message';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function Chat({userName, roomName, currentMembers, setWebSocket}) {
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    let [privateMessageReceiver, setPrivateMessageReceiver] = useState(null);
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

    function sendMessage() {
        console.log(privateMessageReceiver !== null);
        console.log(`Message: ${messageText}`);
        if (privateMessageReceiver !== null) {
            const messageObject = {
                type: 'PrivateMessage',
                roomName: roomName,
                sender: userName,
                receiver: privateMessageReceiver,
                message: messageText
            }
            socket.send(JSON.stringify(messageObject));
            messageObject.received = false;
            setMessages(prevMessages => [...prevMessages, messageObject]);
            setMessageText('');
            setPrivateMessageReceiver(null);
        } else if (messageText.trim() !== '' && socket) {
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

    useEffect(() => {

        if (socket) {
            const messageObject = {
                type: "ChangeUsernameMessage",
                username: userName
            };
            socket.send(JSON.stringify(messageObject));
            console.log("sent");
        }

    }, [userName]);

    async function handleKeyPress(event) {
        if (event.key === 'Enter') {
            await setMessageText(event.target.value);
            console.log(`Valueeeeee:${event.target.value}`);
            sendMessage();
            event.target.value = '';
        } else if (event.key === '@') {
            axios.get('http://localhost:8080/ChatRoom/user')
                .then(response => response.data)
                .then(data => {
                    const list = document.getElementById('usernames');
                    list.className = 'visible';
                    for (let i = 0; i < data.length; i++) {
                        list.innerHTML += `<option value=${data[i]}>${data[i]}</option>`;
                    }
                    console.log(data);
                });

        }
    }

    function chooseUser() {
        document.getElementById('usernames').className = 'invisible';

        setPrivateMessageReceiver(document.getElementById('usernames').value);
        console.log(document.getElementById('usernames').value);
    }

    return (
        <div id='room'>
            <div id='chat' ref={chatRef}>
                {messages.map((message, index) => (
                    <Message key={index} message={message}/>
                ))}
            </div>
            <div id='textInput'>
                <select id="usernames" value={''} className='invisible' onChange={() => chooseUser()}></select>
                <input
                    id='textInput'
                    type='text'
                    placeholder='Write something'
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}

export default Chat;
