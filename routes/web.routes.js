var router = express.Router();

var UserController = require('../app/user/controllers/userController');
var DashboardController = require('../app/dashboard/controllers/dashboardController');
var RestaurantController = require('../app/vendor/restaurant/controllers/restaurantController');

// ensure that auth is required for route
var ensureAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

router.get('/', ensureAuthenticated, function (req, res) {
    DashboardController.index(req, res);
});

router.get('/login', (req, res) => UserController.getLogin(req, res));

router.post('/login', (req, res) => UserController.postLogin(req, res));

router.get('/signup', (req, res) => UserController.getSignup(req, res));

router.post('/signup', (req, res) => UserController.postSignup(req, res));

router.get('/logout', (req, res) => UserController.logout(req, res));

router.get('/profile', ensureAuthenticated, (req, res) => UserController.showProfile(req, res));

router.get('/restaurants', ensureAuthenticated, (req, res) => RestaurantController.showAll(req, res));

router.get('/restaurant/add', ensureAuthenticated, (req, res) => RestaurantController.add(req, res));

router.get('/restaurant/update', ensureAuthenticated, (req, res) => RestaurantController.update(req, res));

router.get('/restaurant/delete', ensureAuthenticated, (req, res) => RestaurantController.delete(req, res));

module.exports = router;
