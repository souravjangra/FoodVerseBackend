const path = require('path');
const capitalize = require('../../../helpers/stringHelper');

class DashboardController {

    constructor() {
    }
}

DashboardController.index = async function (req, res) {
    var username = capitalize(req.user.firstname) + " " + capitalize(req.user.lastname);
    res.render(path.join(BASE_DIR, 'app/dashboard/views', 'index'), {user: req.user, username: username, pageName: 'Dashboard'});
};

module.exports = DashboardController;
