//socket io
const socket = io();

const welcome = document.getElementById("welcome");
const form = document.querySelector("form");

function backdendDone() {
    console.log("backend done!");
}

function handleRoomSubmit(e) {
    e.preventDefault();
    const input = form.querySelector("input");

    //emit의 마지막 arg는 fn
    socket.emit("enter_room", input.value, backdendDone);
    input.value ="";
} 

form.addEventListener("submit", handleRoomSubmit);




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