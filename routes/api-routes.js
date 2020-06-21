// var db = require('../models');
// var passport = require('../config/passport');

// module.exports = (app) => {
//     // app.post("/api/login", (req, res, next) => {
//     //     passport.authenticate("local", (err, user, info) => {
//     //         if(err) {
//     //             return next(err);
//     //         }
//     //         if(!user) {
//     //             return res.status(401).send({success: false, message: info.message})
//     //         }
//     //         return res.send({success: true, message: "Login Success"});
//     //     })(req, res, next);
//     // });
//     app.post("/api/login", passport.authenticate("jwt", {session: false}), (req, res) =>{
//         res.json({success: "false"});
//     })

//     // route for signing up the user
//     app.post("/api/signup", (req, res) => {
//         console.log(req.body);

//         db.User.create({
//             email: req.body.email,
//             password: req.body.password
//         }).then(()=>{
//             res.redirect(307, "/api/login");
//         }).catch((err)=>{
//             console.log(err);
//             res.json(err);
//         })
//     });

//     // route for logging user out
//     app.get("/logout", (req, res) => {
//         req.logout();
//         res.redirect("/");
//     });

//     // route for getting the user data
//     app.get("/api/user_data", (req, res) => {
//         if(!req.user) {
//             // user is not logged in, send back empty object
//             res.json({message: "No user is logged in!"});
//         } else {
//             res.json({
//                 email: req.user.email,
//                 id: req.user.id
//             });
//         }
//     })

// }