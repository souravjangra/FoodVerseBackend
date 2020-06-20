var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')

var PORT = process.env.PORT || 8080;

var passport = require("./config/passport");

var db = require('./models');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({secret: "foodverse backend", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// routes
require("./routes/html-routes.js");
require("./routes/api-routes.js")(app);

// app.get('/', (req, res) => {
//     res.send("NodeJS is running!");
// });

db.sequelize.sync().then(()=>{
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});

