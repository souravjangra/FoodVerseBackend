var path = require('path');

var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = (app) => {
    app.get("/", (req, res) => {
        if(req.user) {
            res.redirect("/my-account");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });
    app.get("/login", (req, res) => {
        if(req.user) {
            res.redirect("/my-account");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });
    app.get("/my-account", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/account.html"));
    });
}