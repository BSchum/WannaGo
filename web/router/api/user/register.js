/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../models/User');
var Voyageur = require('../../../../models/Voyageur');
var hash = require('../../../../helper/hash');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function (req,res) {
    res.send("PAGE REGISTER");
});

router.put('/voyageur', function(req,res){
    Inscrire(req, res);
});

var Inscrire = function (req, res) {
    //Verification du body
    console.log("Fonction Inscrire : \n"+ req.body);

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var date = req.body.date;

    saveUser(username, password, email, date, req, res);
};

var saveUser = function (username, password, email, date, req, res) {
    var user = User({
        username: username,
        email: email,
        password: hash.hashPassword(password),
        date: date
    });
    user
        .save(function () {
            saveVoyageur(user._id , req , res);
        } , function (err) {
            console.log(err);
        });
};

var saveVoyageur = function (idUser, req, res) {
  var voyageur = Voyageur({
      profile: idUser
  });
  voyageur
      .save(function () {
          res.end();
      });
};

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