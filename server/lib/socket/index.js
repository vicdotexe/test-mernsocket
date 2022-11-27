const chat = require('./handlers/lobby');
const auth = require('./handlers/auth');
const game = require('./handlers/game');

module.exports = (io, socket) => {
    chat(io, socket);
    auth(io, socket);
    game(io, socket);
}