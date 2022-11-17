const express = require('express');
const http = require('http');
const path = require('path');

const cors = require('cors');

// Set up the Express App
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io')(
    server, {
        cors:{
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    }
);
const PORT = process.env.PORT || 8000;


// Set Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// Set the static directory
app.use('/',express.static(path.join(__dirname,'public')));

socketio.on('connection', client=>{
    console.log('client connected');
})

server.listen(PORT, function() {
console.log('App listening on PORT ' + PORT);
});