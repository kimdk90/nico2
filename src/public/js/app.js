//socket io
const socket = io();

//룸
const welcome = document.getElementById("welcome");
const form = document.querySelector("form");

//message
const room = document.getElementById("room");

const msgForm = room.querySelector("#msg");
const nameForm = room.querySelector("#name");

room.hidden = true;

//참가자 확인
let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function backdendDone() {
    console.log("backend done!");
}

function handleMessageSubmit(e) {
    e.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You : ${value}`);
    });
    input.value = '';
};

function handleNicknameSubmit(e) {
    e.preventDefault();
    const input = room.querySelector("#name input");
    const value = input.value;
    socket.emit("nickname", value);
    nameForm.hidden = true;
};

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(e) {
    e.preventDefault();
    const input = form.querySelector("input");
    
    //emit의 마지막 arg는 fn
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value ="";
} 

form.addEventListener("submit", handleRoomSubmit);

socket.on("Welcome", (user) => {
    addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);


//ws
// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
// const socket = new WebSocket(`ws://${window.location.host}`);


// function makeMessage(type, payload) {
//     const msg = {type, payload};
//     return JSON.stringify(msg);
// }

// socket.addEventListener("open", () => {
//     console.log("Connected to server O");
// });

// socket.addEventListener("message", (message) => {
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.append(li);
// });

// socket.addEventListener("close", () => {
//     console.log("Connected to server X");
// });

// // setTimeout(() => {
// //     socket.send("hello from the browser!");
// // }, 10000);

// function handlesubmit(e) {
//     e.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     input.value = "";
// };

// function handleNickSubmit(e) {
//     e.preventDefault();
//     const input = nickForm.querySelector("input");
//     socket.send(makeMessage("nickname", input.value));
//     input.value = "";
// }

// messageForm.addEventListener("submit", handlesubmit);
// nickForm.addEventListener("submit", handleNickSubmit);