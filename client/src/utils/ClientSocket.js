import io from 'socket.io-client'

const GameLogic = (ioRef)=>{
    const socket = ioRef;
    return {
        PlaceCard(gridIndex, cardData, cardFaction){
            socket.emit('cardplaced', {gridIndex, cardData, cardFaction})
        },
        OnCardPlaced(callback){
            socket.on('cardplaced', data=>{
                if (callback){
                    callback(data);
                }
            })
        }
    }
}

const Chat = (ioRef)=>{
    const socket = ioRef;
    return {
        PlaceCard(gridIndex, cardData, cardFaction){
            socket.emit('cardplaced', {gridIndex, cardData, cardFaction})
        },
        OnCardPlaced(callback){
            socket.on('cardplaced', data=>{
                if (callback){
                    callback(data);
                }
            })
        },    
        /** Sends a message for the server to emit to the main lobby */
        SendLobbyMessage(message){
            socket.emit("chat", {type: "to_lobby", message:message});
        },
    
        /** Sends a message for the server to emit to a specific room */
        SendRoomMessage(room, message){
            socket.emit("chat", {type: "to_room", room: room, message:message})
        },
    
        /** Sends a message for the server to emit to a specific user */
        SendDm(userId, message){
            socket.emit("chat", {type: "to_user", toUserId: userId, message:message})
        },
        
        /**
         * akin to 'addEventListener', callback is triggered when a new lobby message arrives
         * @param {*} callback the call back function, gets passed a data object with user/message info
         */
        OnLobbyMessageRecieved(callback){
            socket.on("chat", (data)=>{

                switch(data.type){
                    case "from_lobby":
                        callback(data);
                        break;
                }
            })
        }
    }
}

const Authentication = (ioRef)=>{
    const socket = ioRef;
    return {
        /**
         * Connect client socket to server with associated unique user info
         * @param {*} userInfo {id, name}
         * @param {*} url optional: we could use this if the server was hosted on a seperate domain
         * todo: figure out if any more user info besides name and id in the database would be useful
         */
        Login(userInfo, callback, url){
            socket.emit("login",userInfo)
            callback();
        },

        Logout(callback){
            socket.emit("logout");
            if (callback){
                callback();
            }
        }
    }
}

const Rooms = (ioRef)=>{
    const socket = ioRef;

    return {
        /** Let the server include you in a specific room */
        Join(room){
            socket.emit("joinroom", {room: room})
        },
        Leave(room){
            socket.emit('leaveroom', {room: room})
        }
    }
}


const ClientSocket = ()=>{
    const socket = io();
    const gameLogic = GameLogic(socket);
    const chat = Chat(socket);
    const authentication = Authentication(socket);

    return {
        GameLogic: gameLogic,
        Chat: chat,
        Authentication: authentication,
        EmitRaw: function(eventType, ...args){
            socket.emit(eventType, ...args)
        }
    }
}

const Socket = ClientSocket();

export default Socket;