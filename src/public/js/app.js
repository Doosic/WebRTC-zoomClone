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

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
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
