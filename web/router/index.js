var router = require('express').Router();
var jwt = require('jsonwebtoken');


var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.use("/api/public",require("./api/public"));

// route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.auth;
    //console.log("Token is in index : %j" , token);

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});
router.use("/api/prive",require("./api/prive"));
router.use("/",require("./front"));

module.exports = router;