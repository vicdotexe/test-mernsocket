const express = require('express');
const http = require('http');
const path = require('path');
const sequelize = require('./config/connection');
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
const connection = require('./lib/socket/ServerSocket')

// Set up the Express App
const app = express();
const httpserver = http.createServer(app);
const PORT = process.env.PORT || 3001;

const mysession = session({
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
app.use(mysession)


// Set Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//setup socketio
connection(httpserver, mysession);

// Set the static directory
app.use('/',express.static(path.join(__dirname,'public')));

// Use the routes
app.use('/', require('./controllers'))

sequelize.sync({force:false}).then(function(){
    httpserver.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
        });
})
