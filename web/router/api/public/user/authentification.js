/**
 * Created by user on 20/03/2017.
 */

var router = require('express').Router();
var User = require('../../../../../models/User');
var hash = require('../../../../../helper/hash');
var crypto = require('crypto');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());

router.get('/', function (req,res) {
    res.send("PAGE Auth");
});

router.post('/', function (req,res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            password = req.body.password;
            password = hash.hashPassword(password);

            // check if password matches
            if (user.password != password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, process.env.SECRET);

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
                //res.redirect("/");
            }

        }

    });
});

module.exports = router;