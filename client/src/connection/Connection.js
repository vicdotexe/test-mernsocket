import io from 'socket.io-client'

class SocketConnection{
    constructor(){

        this.io = io();
    }
    /**
     * Connect client socket to server with associated unique user info
     * @param {*} userInfo {id, name}
     * @param {*} url optional: we could use this if the server was hosted on a seperate domain
     * todo: figure out if any more user info besides name and id in the database would be useful
     */
    Login(userInfo, callback, url){
        this.io.emit("login",userInfo)
        callback();
    }

    Logout(callback){
        this.io.emit("logout");
        console.log("loggedout");
        callback();
    }

    /** Sends a message for the server to emit to the main lobby */
    SendLobbyMessage(message){
        this.io.emit("chat", {type: "to_lobby", message:message});
    }

    /** Sends a message for the server to emit to a specific room */
    SendRoomMessage(room, message){
        this.io.emit("chat", {type: "to_room", room: room, message:message})
    }

    /** Sends a message for the server to emit to a specific user */
    SendDm(userId, message){
        this.io.emit("chat", {type: "to_user", toUserId: userId, message:message})
    }

    /** Let the server include you in a specific room */
    JoinRoom(room){
        this.io.emit("joinroom", {room: room})
    }

    /**
     * akin to 'addEventListener', callback is triggered when a new lobby message arrives
     * @param {*} callback the call back function, gets passed a data object with user/message info
     */
    OnLobbyMessageRecieved(callback){
        this.io.on("chat", (data)=>{

            switch(data.type){
                case "from_lobby":
                    callback(data);
                    break;
            }
        })
    }

    MapEvents(io){
        this.io.on("message", (data)=>{

            switch(data.type){
                case "serverMessage":
                    console.log("server says:" + data.content.message);
                    io.send({type:"clientMessage", content:{message:"I'm responding to your message!"}})
                break;
            }
        })

        this.io.on("chat", (data)=>{
            switch(data.type){
                case "from_lobby":

                    break;
            }
        })
    }

    
    /** Access to the raw socket emit function... because why not?*/
    EmitRaw(eventType, ...args){
        this.io.emit(eventType, ...args)
    }
}

const socketConnection = new SocketConnection();

export default socketConnection;