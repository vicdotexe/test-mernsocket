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
                const {meta, gridIndex, faction} = data.data;
                const card = {
                    name:meta.name,
                    faction: faction,
                    compass: meta.compass
                }

                
                const changes = game.Grid.PlaceCard(card, gridIndex);


                io.to(data.room).emit("gameAction", {
                    type: "placeCard",
                    data:{
                        meta: meta,
                        gridIndex, gridIndex,
                        faction: faction,
                        changes: changes
                    }
                });
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

    socket.on('disconnect', data=>{
        
    })
}