/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../../models/User');
var Post = require('../../../../../models/Post');
var Commentaire = require('../../../../../models/Commentaire')
var Photo = require('../../../../../models/Photo');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());

var decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiZGF0ZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJ1c2VybmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJkYXRlIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJkYXRlIjoiMjgvMDIvMjAyOSIsInBhc3N3b3JkIjoieTlEUjQ2SGRJVll6cjhmVEdXSVNxMURxcHcvVUNyaGl0dUphMElsR2piOD0iLCJlbWFpbCI6ImxvbG9AbG9sby5mciIsInVzZXJuYW1lIjoiT2xvaWNrIiwiX2lkIjoiNThkNTI5OTI2ZDM5ZWIxYjY4MjQxNTc1In0sImlhdCI6MTQ5MDM2NDgyNX0.IBsuh8FUxlg5lSv-K9YtVJABRW3uD4B30olT0jQw2Yk",process.env.SECRET, true);


router.put('/', function (req,res) {
    var post = Post();
    InscriptionPost(post, req, res);
});

var InscriptionPost = function(post, req, res) {
    saveAuthor(post, req, res);
};

var saveAuthor = function(post, req, res){
   var idAuthor = decoded._doc._id;

    return User
        .findOne({_id : idAuthor})
        .exec(function(err, UserData){
            console.log(" register post : \n " + UserData)
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