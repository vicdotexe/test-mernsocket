//const EventTypes = require('../connection/EventTypes')
//const ChatTypes = require('../connection/ChatTypes')
const {addUser, removeUser, getUserBySocketId, getUserByUserId} = require('../connection/Users')

const Connection = (server)=>{

    const userMap = new Map();
    const socketMap = new Map();


    server.on('connection', (socket)=>{

        

        //todo: should this stuff be stored here or passed in with every event from the client
        const {username, id} = socket.handshake.auth.userInfo;
        console.log(`client: ${username} connected`);
        const user = {
            username: username,
            userId: id,
            socketId: socket.id
        }
        addUser(user);

        socket.on("disconnect", (reason)=>{
            removeUser(user);
            console.log(`client: ${username} disconnected`);
        })
        
        socket.on("chat", data=>{
            switch(data.type){
                case "to_lobby":
                    //todo: push message to database (this way new sessions can query the db to sync chat history, maybe lobby has a limit and starts dropping old message)
                    // emit the message to entire server
                    data.type = "from_lobby";
                    data.username = username;
                    server.emit("chat", data)
                    break;
                case "to_user":
                    //todo: push message to data base (this way new sessions can query the db to sync chat history)
                    data.type = "from_user";
                    server.to(socket.id).to(getUserByUserId(data.toUserId).socketId).emit("chat", data);
                    break;
                case "to_room":
                    // emit the message to everyone in the room
                    data.type = "from_room";
                    data.username = username;
                    data.id = id;
                    //todo: should individual room chats be stored in database?
                    server.to(data.room).emit(data);
                    break;
            }
        })

        socket.on("join_room", data=>{
            
        })

    })
}

module.exports = Connection