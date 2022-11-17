import io, { Socket } from 'socket.io-client';

const URL = 'http://localhost:8000'

const socket = io(URL);

var mySocketId;

socket.on('connection', listener =>{
    console.log("server says hi");
})

export {
    Socket,
    mySocketId
}