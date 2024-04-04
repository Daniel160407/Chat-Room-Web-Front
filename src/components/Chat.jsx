import '../styles/chat.scss';
import Message from './Message';

function Chat(){
    const socket=new WebSocket('ws://localhost:8080/ChatRoom/chatEndpoint');

    socket.onopen=function(event){
        onOpen(event);
    }

    socket.onmessage=function(event){
        onMessage(event);
    }

    socket.onerror=function(event){
        console.log(event);
    }

    function onOpen(event){
        console.log(event)
        document.getElementById('chat').innerHTML+=<Message message={event.data}/>;
    }

    return(
        <div id='room'>
            <div id='chat'></div>
            <div id='textInput'>
                <input type='text' placeholder='Write something'></input>
            </div>
        </div>
    );
}

export default Chat;