/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();
var Voyageur = require('../../../../../models/Voyageur')
var bodyParser = require('body-parser');
require('../../../../../config/index');

router.use(bodyParser.json());


router.get('/', function (req,res) {
    informationUser(req, res);
});

var informationUser = function (req,res) {
    return Voyageur
      .findOne({profile : req.user._id})
      .populate('profile')
        .populate('facebook')
        .exec(function (err, voyageurData) {
           res.json(voyageurData);
        });
};

module.exports = router;

