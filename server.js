const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');

const app = express();

var corsOption = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setting up public folder
app.use(express.static("public"));

// app.use(session({secret: "foodverse backend", resave: true, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// app.get('/', (req, res) => {
//     res.send("NodeJS is running!");
// });

const db = require('./models');
const Role = db.role;

const PORT = process.env.PORT || 8080;

// use force: true only in development to enter the roles rows
db.sequelize.sync().then(()=>{
    // initial();
    app.listen(PORT, () => {
        console.log("App listening on PORT " + PORT);
    });
});

initial = () => {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "vendor"
    });
    Role.create({
        id: 3,
        name: "admin"
    });
}

