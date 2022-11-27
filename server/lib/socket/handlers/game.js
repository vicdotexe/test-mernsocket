const GameManager = require('../../managers/GameManager');
const UserManager = require('../../managers/UserManager')

module.exports = (io, socket) =>{
    
    
    socket.on("gameAction", data=>{
        const user = UserManager.getBySocketId(socket.id);
        const game = GameManager.getGame(data.room);

        switch(data.type){
            case "pickColor":
                game.SetColor(user.username);
                break;
            case "ready":
                io.to(data.room).emit("gameAction", data)
                break;
            case "placeCard":
                io.to(data.room).emit("gameAction", data);
                break;
            
        }
    })

    socket.on('createGame', data =>{
        const user = UserManager.getBySocketId(socket.id);
        const game = GameManager.createGame(data);
        socket.join(game.GetId());
        game.AddPlayer(user.username);
    })

    socket.on('joinGame', data=>{
        const user = UserManager.getBySocketId(socket.id);
        const game = GameManager.getGame(data);
        if (game){
            game.AddPlayer(user.username)
            socket.join(game.GetId());
        }
    })
}