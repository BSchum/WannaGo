/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();

var User = require('../../../../../models/User')
var Commentaire= require('../../../../../models/Commentaire');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

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
    var idAuthor = req.body.id_author;

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