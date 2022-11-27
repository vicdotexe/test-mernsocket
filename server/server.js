const express = require('express');
const http = require('http');
const path = require('path');
const sequelize = require('./config/connection');
const session = require("express-session")
const sharedsession = require('express-socket.io-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');


// Set up the Express app and server
const app = express();
const httpserver = http.createServer(app);
const PORT = process.env.PORT || 3001;

const eSession = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:2*60*60*1000
    },
    store: new SequelizeStore({
        db:sequelize
    })
});
// Set Express to use sessions
app.use(eSession)


// Set Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//setup socketio
const io = require('socket.io')(httpserver);
io.use(sharedsession(eSession));

const socketHandler = require('./lib/socket');
io.on('connection', (socket)=>{
    socketHandler(io, socket);
});

// Set the static directory
app.use('/',express.static(path.join(__dirname,'public')));

// Use the routes
app.use('/', require('./controllers'))

sequelize.sync({force:false}).then(function(){
    httpserver.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
        });
})
