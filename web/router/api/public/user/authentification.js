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
require('../../../../../config/passport');


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
            jPassword = req.body.password;
            password = hash.hashPassword(jPassword);

            // check if password matches
            if (user.password != password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // if user is found and password is right
                // create a token
                var payload = { id: user.id };
                var token = jwt.sign(payload, process.env.SECRET);

                // A traiter avec la partie front
               //return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: 'JWT ' + token
                });
                //res.cookie('auth',token);
                //res.send("ok");
            }

        }

    });
});

module.exports = router;