const Grid = require('./Grid')

function Game(gameId){
    const id = gameId;
    const players = [];
    const colors = ["blue", "red"];
    const ready = Array(2).fill(false);
    const grid = new Grid();

    function getUserIndex(username){
        return username == players[0] ? 0 : 1;
    }
    return {
        AddPlayer(username){
            players.push(username);
        },
        SetColor(username, color){
            const index = getUserIndex(username);
            colors[index] = color;
        },
        SetReady(username){
            const index = getUserIndex(username);
            ready[index] = true;
        },
        CheckBothReady(){
            return ready[0] && ready[1];
        },
        GetId(){
            return id;
        },
        Grid: grid
    }
}

module.exports = Game;
