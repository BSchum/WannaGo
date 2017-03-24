/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../../models/User');
var Post = require('../../../../../models/Post');
var Commentaire = require('../../../../../models/Commentaire')
var Photo = require('../../../../../models/Photo');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.put('/', function (req,res) {
    var post = Post();
    InscriptionPost(post, req, res);
});

var InscriptionPost = function(post, req, res) {
    saveAuthor(post, req, res);
};

var saveAuthor = function(post, req, res){
    var idAuthor = req.body.id_author;

    return User
        .findOne({_id : idAuthor})
        .exec(function(err, UserData){
            post.author = UserData;
            addPhoto(post, req, res);
        });
};

var addPhoto = function (post, req, res) {
    var idPhoto = req.body.id_photo;

    return Photo
        .findOne({_id : idPhoto})
        .exec(function(err, PhotoData){
            post.photo = PhotoData;
            addCommentaire(post, req, res);
        });
};

var addCommentaire = function (post, req, res) {
    var all_commentaire = req.body.commentaires;
    var idCommentaires = [];
    all_commentaire.forEach(function (element) {
        idCommentaires.push(element.id);
    });
    Commentaire.find({
        _id : {$in : idCommentaires}
    } , function(err , data){
        data.forEach(function (element) {
            post.commentaires.push(element);
        });
        savePost(post, req, res);
    });
};

var savePost = function(post, req, res){
    return post
        .save( function (err, data) {
            res.send({post: post});
            res.end();
        });
};
module.exports = router;