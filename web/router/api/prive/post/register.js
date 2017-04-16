/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../../models/User');
var Post = require('../../../../../models/Post');
var Commentaire = require('../../../../../models/Commentaire');
var Voyageur = require('../../../../../models/Voyageur');
var Photo = require('../../../../../models/Photo');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());

router.put('/', function (req,res) {
    var post = Post();
    InscriptionPost(post, req, res);
});

var InscriptionPost = function(post, req, res) {
    saveAuthor(post, req, res);
};

var saveAuthor = function(post, req, res){
   var idAuthor = req.user._id;

    return User
        .findOne({_id : idAuthor})
        .exec(function(err, UserData){
            console.log(" register post : \n " + UserData)
            post.author = UserData;
            addPhoto(post, req, res);
        });
};

var addPhoto = function (post, req, res) {
  url = req.body.url;
  date = req.body.date;
  description = req.body.description;

  var photo = Photo({
      url: url,
      date: date,
      description: description
  });
  photo
      .save(function (err, data) {
          addPhotoInPost(post, data._id, req, res);
          console.log(err);
      })
};

var addPhotoInPost = function(post, id, req, res) {
  return Photo
    .findOne({_id: id})
    .exec(function(err, data){
      post.photo = data;
      addCommentaire(post, req, res);
    })
}

var addCommentaire = function (post, req, res) {
  console.log("req commentaires is : %j",req.body.commentaires)
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
            savePostToVoyageur(post, req, res);
        });
};

var savePostToVoyageur= function(post, req, res){
    Voyageur
      .findOne({profile: req.user._id}, function (err, voyageur) {
        console.log(" Voyageur is : %j", voyageur);
        voyageur.post.push(post);
        console.log(" 2 Voyageur is : %j", voyageur);
        saveAll(voyageur, req, res);
      })
  }
var saveAll = function(voyageur, req, res){
  voyageur.save(function(err, data){
    res.json({"voyageur": data});
    res.end();
  })
}

module.exports = router;
