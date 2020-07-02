exports.allAccess = (req, res) => {
    if(req.user) {
        res.render('pages/index');
    }
    res.redirect('/login');
}

exports.userBoard = (req, res) => {
    res.status(200).send("User Content");
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content");
}

exports.vendorBoard = (req, res) => {
    res.status(200).send("Vendor Content");
}
