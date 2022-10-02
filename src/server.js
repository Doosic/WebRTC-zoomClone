// 이번 프로젝트에서 Express로 해야할 일은 view를 설정해주고 랜더링해주는 것 뿐
import * as http from "http";
import {WebSocket} from "ws";
import express from "express";

const app = express();

// 1.view engine을 pug로 설정
app.set("view engine", "pug");
// 2.Express에 template 파일 위치를 지정
app.set("views", __dirname + "/views");
// 3.public url을 생성하여 유저에게 파일 공유
app.use("/public", express.static(__dirname + "/public"));
// 4.home.pug 를 랜더링 해주는 설정 적용. / 경로로 진입시 view home을 보여준다.
app.get("/", (_, res) => res.render("home"));
// 5.유저가 어디로 이동하든지 home으로 redirect 시켜준다.
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// 가짜 데이터베이스 역할(잠시 접속하는 브라우저들에 대한 정보를 담아뒀다가 해당 브라우저에 메세지를 다 뿌려주기위함)
const sockets = [];

// 아래 코드가 없어도 프론트엔드에서 요청한다면 Connection은 가능 다만 반응해줄수 없다.
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser");
    socket.on("close", () => {
        console.log("Disconnected from the Browser");
    })

    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        console.log(message);
        switch(message.type){
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
    })
});

server.listen(3000, handleListen);
