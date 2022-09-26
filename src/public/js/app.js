const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
    console.log("Connected to Server");
})

socket.addEventListener("message", (message) => {
    if (message.data instanceof Blob){
        reader = new FileReader();

        // 파일(메세지)를 읽어들인다.
        reader.readAsText(message.data);

        // 읽는 동작이 성공적으로 완료되었을때 발생
        reader.onload = () => {
            console.log(reader.result);
        };

    }else {
       console.log(message.data);
    }

})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server");
})

// setTimeout(() => {
//     socket.send("hello from the browser!")
// }, 10000);

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);