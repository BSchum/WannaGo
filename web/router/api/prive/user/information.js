/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();
var User = require('../../../../../models/User')
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
               photo: voyageurData.photo
           });
        });
};

module.exports = router;
