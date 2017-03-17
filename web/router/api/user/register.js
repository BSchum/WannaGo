/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../models/User');
var hash = require('../../../../helper/hash');

router.get('/', function (req,res) {
    res.send("REGISTER");
});

router.post('/', function(req,res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        username: username,
        email: email,
        password: hash.hashPassword(password)
    }).save().then(function(userSaved){
       res.json(userSaved);
    });
});

router.get('/allUsers', function(req,res){
    getUser(req, res);
});

var getUser = function (req,res){
    User
        .find({})
        .exec(function(err , user) {
            console.log(user);
            res.json(user);
            res.end();
        });
};



module.exports = router;