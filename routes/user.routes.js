const {authJwt} = require("../config/middleware");

const controller = require("../controllers/user.controller");
const message = require("../config/middleware/message");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get("/api/test/vendor", [authJwt.verifyToken, authJwt.isVendor], controller.vendorBoard);

    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    app.get("/", controller.allAccess);

    app.get("/login", message, (req, res, next) => {
        res.render('pages/login');
    });
    
}