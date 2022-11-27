const game = (gameId) =>{
    const id = gameId;
    const players = [];
    const colors = ["blue", "red"];
    const ready = Array(2).fill(false);

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
        }
    }
}

const gameManager = () =>{
    const games = new Map();

    return {
        createGame(id){
            const newGame = game(id);
            games.set(id, newGame);
            return newGame;
        },
        getGame(id){
            return games.get(id);
        },
        removeGame(id){
            games.delete(id);
        }
    }
}

const GameManager = gameManager();
module.exports = GameManager;