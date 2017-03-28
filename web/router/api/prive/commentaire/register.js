/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();

var User = require('../../../../../models/User')
var Commentaire= require('../../../../../models/Commentaire');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var testToken = require('../../../index');
require('../../../../../config/index');

router.use(bodyParser.json());

var decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiZGF0ZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJ1c2VybmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJkYXRlIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJkYXRlIjoiMjgvMDIvMjAyOSIsInBhc3N3b3JkIjoieTlEUjQ2SGRJVll6cjhmVEdXSVNxMURxcHcvVUNyaGl0dUphMElsR2piOD0iLCJlbWFpbCI6ImxvbG9AbG9sby5mciIsInVzZXJuYW1lIjoiT2xvaWNrIiwiX2lkIjoiNThkNTI5OTI2ZDM5ZWIxYjY4MjQxNTc1In0sImlhdCI6MTQ5MDM2NDgyNX0.IBsuh8FUxlg5lSv-K9YtVJABRW3uD4B30olT0jQw2Yk",process.env.SECRET, true);

router.put('/', function (req,res) {
    var commentaire = Commentaire();
    console.log(" TEST : \n" + testToken.token);
    //console.log("User : %j", decoded);
    InscriptionCommentaire(commentaire, req, res);
});

var InscriptionCommentaire = function(commentaire, req, res) {
    commentaire.date = req.body.date;
    commentaire.description = req.body.description;

    saveUserInCommentaire(commentaire, req, res);
};

var saveUserInCommentaire = function(commentaire, req, res){
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