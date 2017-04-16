var router = require('express').Router();
var Voyageur = require('../../../../../models/Voyageur');
var Reservation = require('../../../../../models/Reservation');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/', function (req,res) {
    informationVoyageur(req, res);
});

var informationVoyageur = function (req,res) {
    return Voyageur
      .findOne({profile : req.user._id})
      .populate('post')
      .populate('reservation')
        .exec(function (err, voyageurData) {
          //On envoi pas le profile
           res.json({
             reservations: voyageurData.reservation,
             posts: voyageurData.post
           });
        });
};

module.exports = router;
