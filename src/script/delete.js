const webSocket = new WebSocket('ws://localhost:8989/messenger/websocket');

webSocket.onerror = function (event) {
    onError(event)
};
webSocket.onopen = function (event) {
    onOpen(event)
};
webSocket.onmessage = function (event) {
    onMessage(event)
};

function onMessage(event) {
    console.log(event.data)
}

function onOpen(event) {
    console.log("Welcome!");
}

function onError(event) {
    alert('An error occurred:' + event.data);
}

function send() {
    var input = document.getElementById("inpt");
    var sid = document.getElementById("sid");
    const msg = {
        type: "PublicMessage",
        sid: "0",
        content: input.value
    }
    webSocket.send(JSON.stringify(msg));
    input.value = "";
}