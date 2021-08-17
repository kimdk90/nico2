import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
  
const handleListen = () => console.log(`listenign on http://localhost:3000`);
//app.listen(3000, handleListen);

//http,ws 같이 실행하기
const server = http.createServer(app); //http

const wss = new WebSocket.Server({server}); //ws

wss.on("connection", (socket) => {
    console.log("Connected to Browser");
    socket.on("close", () => {
        console.log("Disconnected from the Browser X");
    });

    socket.on("message", (message) => {
        console.log(message);
    });
    
    socket.send("hello!!!");
});

server.listen(3000, handleListen);