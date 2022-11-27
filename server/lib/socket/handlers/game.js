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
                io.to(data.room).emit(data.type)
                break;
            case "placeCard":
                io.to(data.room).emit(data.type, data.data);
                break;
            
        }
    })

    socket.on('createGame', data =>{
        const user = UserManager.getBySocketId(socket.id);
        const game = GameManager.createGame(data);

        game.AddPlayer(user.username);
    })

    socket.on('joinGame', data=>{
        const user = UserManager.getBySocketId(socket.id);
        const game = GameManager.getGame(data.room);
        if (game){
            game.AddPlayer(user.username)
        }
    })
}