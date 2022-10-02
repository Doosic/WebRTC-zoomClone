const messageList = document.querySelector("ul")
const messageForm = document.querySelector("#message")
const nickForm = document.querySelector("#nick")
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type, payload}
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");

    // if (message.data instanceof Blob){
    //     reader = new FileReader();

        // 파일(메세지)를 읽어들인다.
        // reader.readAsText(message.data);

        // 읽는 동작이 성공적으로 완료되었을때 발생
        // reader.onload = () => {
        //     console.log("읽기 완료!");
        //     li.innerText = reader.result;
            li.innerText =  JSON.stringify(message.data);
            messageList.append(li);
        // };

    // }else {
    //    console.log(message.data);
    // }

})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
})


function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
