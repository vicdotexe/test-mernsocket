export const Lobby = (socket)=>{
    return {
        /** Sends a message for the server to emit to the main lobby */
        SendMessage(message){
            socket.emit("lobbyMessage", {content:message});
        },
        /**
         * akin to 'addEventListener', listener is triggered when a new lobby message arrives
         * @param {*} listener called when the lobby recieves a message gets passed an object with user/message data
         */
        OnMessageRecieved(listener){
            socket.on("lobbyMessage", (data)=>{
                listener(data);
            })
        }
    }
}