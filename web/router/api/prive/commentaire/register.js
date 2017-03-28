/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();

var User = require('../../../../../models/User')
var Commentaire= require('../../../../../models/Commentaire');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
// var testToken = require('../../../index');
require('../../../../../config/index');

router.use(bodyParser.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.put('/', function (req,res) {
    var commentaire = Commentaire();
    InscriptionCommentaire(commentaire, req, res);
});

var InscriptionCommentaire = function(commentaire, req, res) {
    commentaire.date = req.body.date;
    commentaire.description = req.body.description;

    saveUserInCommentaire(commentaire, req, res);
};

var saveUserInCommentaire = function(commentaire, req, res){
    var token = req.cookies.auth;
    var decoded = jwt.decode(token,process.env.SECRET, true);
    var idAuthor = decoded._doc.username;

    return User
        .findOne({_id : idAuthor})
        .exec(function(err, UserData){
            commentaire.author = UserData;
            saveCommentaire(commentaire, req, res);
        });
};

var saveCommentaire = function(commentaire, req, res){
    return commentaire
        .save( function (err, data) {
            res.send({commentaire: commentaire});
            res.end();
        });
};
module.exports = router;