const Game = require('../Game/Game')

const gameManager = () =>{
    const games = new Map();

    return {
        createGame(id){
            const newGame = Game(id);

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