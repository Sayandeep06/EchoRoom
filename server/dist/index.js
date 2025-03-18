"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on('connection', (socket) => {
    console.log('New connection established');
    socket.on('message', (message) => {
        var _a;
        const parsedMessage = JSON.parse(message);
        console.log('Received message:', message);
        if (parsedMessage.type === "join") {
            console.log('Joining room:', parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === 'chat') {
            const currentUserRoom = (_a = allSockets.find((x) => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            console.log('Current user room:', currentUserRoom);
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].room == currentUserRoom) {
                    console.log('Sending message to room:', currentUserRoom);
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    });
});
