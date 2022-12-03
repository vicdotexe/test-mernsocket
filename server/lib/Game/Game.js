const Grid = require('./Grid')

function Game(gameId){
    const id = gameId;
    const players = [];
    const grid = new Grid();

    function getUserIndex(username){
        return username == players[0] ? 0 : 1;
    }

    function getPlayer(username){
        return players[getUserIndex(username)];
    }

    function CreateState(changes){
        return {
            gameId: id,
            players: players.map(player=>{return {
                color: player.color,
                ready: player.ready,
                username: player.username
            }}),
            grid: grid.slots,
            changes: changes
        }
    }
    return {
        AddPlayer(username){
            players.push(username);
        },
        SetColor(username, color){
            const index = getUserIndex(username);
            players[index].SetFaction(color);
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
