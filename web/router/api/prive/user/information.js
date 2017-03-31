/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();
var Voyageur = require('../../../../../models/Voyageur')
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());


router.get('/', function (req,res) {
    informationUser(req, res);
});

var informationUser = function (req,res) {
    var token = req.cookies.auth;
    var decoded = jwt.decode(token ,process.env.SECRET, true);

    return Voyageur
      .findOne({profile : decoded._doc._id})
      .populate('profile')
        .exec(function (err, voyageurData) {
           res.json(voyageurData);
        });
};

module.exports = router;

