// 이번 프로젝트에서 Express로 해야할 일은 view를 설정해주고 랜더링해주는 것 뿐
import * as http from "http";
// import {WebSocket} from "ws";
import express from "express";
import SocketIO from "socket.io"

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


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event: ${event}`);
    })
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName)
        done();
        socket.to(roomName).emit("welcome");
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye"));
    })
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", msg);
        done();
    })
})


const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
