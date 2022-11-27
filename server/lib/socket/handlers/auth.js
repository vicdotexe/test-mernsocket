const users = require('../../managers/UserManager')

module.exports = (io, socket) => {
    //todo: should this stuff be stored here or passed in with every event from the client
    const userdata = {
        socketId: socket.id,
        username: "Guest",
        userId: 1
    }

    if (socket.handshake.session.userdata){
        userdata.username = socket.handshake.session.userdata.username;
        userdata.userId = socket.handshake.session.userdata.userId;
    }
    users.addUser(userdata);

    console.log(`client: ${socket.id} connected`);

    socket.on("login", (userdata)=>{
        socket.handshake.session.userdata = userdata;
        socket.handshake.session.save();
        
        const {username, userId} = userdata;

        const user = users.getBySocketId(socket.id);
        user.userId = userId;
        user.username = username;
    })

    socket.on("logout", function(userdata) {
        if (socket.handshake.session.userdata) {
            delete socket.handshake.session.userdata;
            socket.handshake.session.save();
        }
        const user = getBySocketId(socket.id);
        user.userId = 1;
        user.username = "Guest";
        console.log('user logged out');
    });   

    
    socket.on("disconnect", (reason)=>{
        users.removeUser(socket.id);
    })
}