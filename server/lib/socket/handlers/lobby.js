const {Chat, Message} = require('../../../models')
module.exports = (io, socket) =>{
    socket.on("lobbyMessage", data=>{
        const user = socket.handshake.session.userdata ? {
            socketId:socket.id,
            username:socket.handshake.session.userdata.username,
            userId: socket.handshake.session.userdata.userId
        } : {
            socketId:socket.id,
            username:"Guest",
            userId:1
        };

        if (!data.room){
            Chat.findOrCreate({
                where:{
                    roomname:"lobby"
                }
                
            }).then(chat=>{
                Message.create({
                    content:data.content,
                    ChatId: chat[0].id,
                    UserId: user.userId
                })
            })
            // emit the message to entire server
            data.username = user.username;
            io.emit("lobbyMessage", data);
        }else{
            io.to(data.room).emit('lobbyMessage', data);
        }
    })
}