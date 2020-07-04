const app = require('express')();
const express = require('express');
const expressSession = require('express-session');
const http = require('http').Server(app);
const fs = require('fs');
const url = require('url');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const device = require('express-device');
const config = require('./config/config');
const passport = require('passport');

var corsOption = {
    origin: "http://localhost:8080"
}

global.app = app;
global.express = express;
global.config = config;
global.BASE_DIR = path.resolve(__dirname);

require('./config/settings');
require('./config/db');

var authHelper = require('./helpers/authHelper');

require('./config/passport')(passport);

global.passport = passport;

process.on('uncaughtException', function (exception) {
    console.log('########## SERVER CRASHED WITH UNCAUGHT EXCEPTION ##########');
    var err = exception;
    if (typeof err === 'object') {
        if (err.message) {
            console.log('\nMessage: ' + err.message)
        }
        if (err.stack) {
            console.log('\nStacktrace:')
            console.log('====================')
            console.log(err.stack);
        }
    } else {
        console.log('dumpError :: argument is not an object');
    }
});

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: config.sessionSecretKey, resave: true, saveUninitialized: false}));
app.use(device.capture());

// setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// setting up public folder
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

// routes
// require("./routes/auth.routes")(app);
// require("./routes/user.routes")(app);

function isAuthenticated(req, res, next) {
    var isAuthenticated = authHelper.authenticate(req, res);
    if(isAuthenticated) {
        next();
    } else {
        res.status(401).send();
    }
}

const message = require('./config/middleware/message');

var web = require('./routes/web.routes');

app.use('/', isAuthenticated, message, web);

http.listen(config.port, config.host, function () {
    var message = config.message.portMsg + config.port;
    console.log(message);
});
