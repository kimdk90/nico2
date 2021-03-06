import http from "http";
import express from "express";
import WebSocket from "ws";
import SocketIo from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
  
const handleListen = () => console.log(`listenign on http://localhost:3000`);
//app.listen(3000, handleListen);

//http,ws 같이 실행하기
const httpServer = http.createServer(app); //http
//ws
//const wss = new WebSocket.Server({server}); //ws
//socket Io
const wsServer = SocketIo(httpServer);

wsServer.on("connection", (socket) => {
    //wsServer.socketsJoin("announcement");
    socket["nickname"] = "Anne";
    socket.onAny((e) => {
        console.log(`socket Event:${e}`);
    });
    socket.on("enter_room", (roomName, done) => {
        
        socket.join(roomName); //room 만들기
        done();
        socket.to(roomName).emit("Welcome", socket.nickname);

        // setTimeout(() => {
        //     done("hello from the background");
        // }, 10000);
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => socket.to(room).emit("bye", socket.nickname)); 
    })

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on("nickname", (nickname) => (socket["nickname"] =nickname));
}); 


//ws 사용시
// //소켓구분
// const sockets = [];

// //ws 연결되면
// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anon";

//     console.log("Connected to Browser");
//     socket.on("close", () => {
//         console.log("Disconnected from the Browser X");
//     });

//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);

//         //switch
//         switch(message.type) {
//             case "new_message" :   
//                 sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`));
//             case "nickname" :
//                 socket["nickname"] = message.payload;
//         }

//         //if 
//         // if(parsed.type === "new_message") {
//         //     sockets.forEach(aSocket => aSocket.send(`${socket.nickname} : ${message.payload}`));
//         // } else if(parsed.type === "nickname") {
//         //     socket["nickname"] = message.payload;
//         // }
        

//         // //ws 버젼때문에 뒤에 tostring 붙여 줍니다.
//         // console.log(message.toString()); 
//         // socket.send(message.toString());
//     }); 
// });

//server.listen(3000, handleListen);

httpServer.listen(3000, handleListen);