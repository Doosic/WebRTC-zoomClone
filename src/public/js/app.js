/*
    * io(): socket.io를 실행하고 있는 서버를 찾아준다.
    * 브라우저의 콘솔창에 io 입력시 확인가능. 엣지는 안됌!
    ƒ lookup(uri, opts) {
    if (_typeof(uri) === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
*/
const socket = io();

const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form")
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault()
    const input = room.querySelector("input");
    /*
        input.value를 변수에 한번 더 담는 이유는
        그냥 input.value를 addMessage로 보내고 비워줬을 때에는
        함수가 실행되기전 input.value = "";가 먼저 실행되어
        함수가 실행될때에는 "" 값을 가지고 실행되기 때문이다.
    */
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const form = room.querySelector("form")
    form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome", () => {
    addMessage("someone joined!");
})

socket.on("bye", () => {
    addMessage("someone left");
})

socket.on("new_message", addMessage);
