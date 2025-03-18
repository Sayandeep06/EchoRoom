import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on('connection', (socket: WebSocket)=>{
    console.log('New connection established');
    socket.on('message',(message)=>{
        
        const parsedMessage = JSON.parse(message as unknown as string);
        console.log('Received message:', message);
        if(parsedMessage.type === "join"){
            console.log('Joining room:', parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type === 'chat'){
            const currentUserRoom = allSockets.find((x)=>x.socket == socket)?.room;
            console.log('Current user room:', currentUserRoom);
            for(let i=0; i<allSockets.length; i++){
                if(allSockets[i].room == currentUserRoom){
                    console.log('Sending message to room:', currentUserRoom);
                    allSockets[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
    })
})
