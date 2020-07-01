exports.allAccess = (req, res) => {
    res.render('pages/home');
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