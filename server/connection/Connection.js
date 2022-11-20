//const EventTypes = require('../connection/EventTypes')
//const ChatTypes = require('../connection/ChatTypes')
const {addUser, removeUser, getUserBySocketId, getUserByUserId} = require('../connection/Users')
const sharedsession = require('express-socket.io-session')

const Connection = (http, session)=>{

    const server = require('socket.io')(
        http
        // setting cors origin option here would only be needed if the server was hosted on a seperate domain.
        // , {
        //     cors:{
        //         origin: "http://localhost:3000",
        //         methods: ["GET", "POST"]
        //     }
        // }
    );

    const userMap = new Map();
    const socketMap = new Map();

    server.use(sharedsession(session));

    server.on('connection', (socket)=>{

        //todo: should this stuff be stored here or passed in with every event from the client
        const userdata = {
            socketId: socket.id,
            username: "Guest",
            userId: -1
        }

        if (socket.handshake.session.userdata){
            userdata.username = socket.handshake.session.userdata.username;
            userdata.userId = socket.handshake.session.userId;
        }
        addUser(userdata);

        console.log(`client: ${socket.id} connected`);

        socket.on("login", (userdata)=>{
            socket.handshake.session.userdata = userdata;
            socket.handshake.session.save();
            
            const {username, userId} = userdata;

            const user = getUserBySocketId(socket.id);
            user.userId = userId;
            user.username = username;
        })

        socket.on("logout", function(userdata) {
            if (socket.handshake.session.userdata) {
                delete socket.handshake.session.userdata;
                socket.handshake.session.save();
            }
            const user = getUserBySocketId(socket.id);
            user.userId = -1;
            user.username = "Guest";
            console.log('user logged out');
        });   

        
        socket.on("disconnect", (reason)=>{
            const user = getUserBySocketId(socket.id);
            removeUser(user.socketId);
            console.log(`client: ${user.username} disconnected`);
        })


        socket.on("chat", data=>{
            const user = getUserBySocketId(socket.id);
            switch(data.type){
                case "to_lobby":
                    //todo: push message to database (this way new sessions can query the db to sync chat history, maybe lobby has a limit and starts dropping old message)
                    // emit the message to entire server
                    data.type = "from_lobby";
                    data.username = user.username;
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
                    data.username = user.username;
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