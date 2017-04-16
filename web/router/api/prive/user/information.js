/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../../models/User')
var Voyageur = require('../../../../../models/Voyageur')
var Commercant = require('../../../../../models/Commercant')
var bodyParser = require('body-parser');
require('../../../../../config/index');

router.use(bodyParser.json());


router.get('/', function (req,res) {
    informationUser(req, res);
});

var informationUser = function (req,res) {
    return User
      .findOne({_id : req.user._id})
        .exec(function (err, voyageurData) {
           res.json({
               username: voyageurData.username,
               email: voyageurData.email,
               date: voyageurData.date,
               photo: voyageurData.photo,
               cover: voyageurData.cover
           });
        });
};

router.get('/type', function (req,res){
  informationType(req, res);
});

var informationType = function(req,res){
  return Voyageur
    .findOne({profile: req.user._id}, function(err, voyageur){
      if(!voyageur){
        return Commercant
          .findOne({profile: req.user._id}, function(err, Commercant){
            if(!Commercant){
              res.json({err: erreur});
              res.end();
            } else {
              res.json({resultat: "Commercant"});
              res.end();
            }
          })
      } else {
        res.json({resultat: "Voyageur"});
        res.end();
      }
    })
}

module.exports = router;
