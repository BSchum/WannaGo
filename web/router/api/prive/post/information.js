/**
 * Created by user on 26/03/2017.
 */
var router = require('express').Router();
var Post = require('../../../../../models/Post');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());
var cookieParser = require('cookie-parser');
router.use(cookieParser());


// Affiche tous les Post de l'utilisateur connecter
router.get('/myPost', function (req,res) {
    var token = req.cookies.auth;
    var decoded = jwt.decode(token ,process.env.SECRET, true);

    return Post
        .find({author: decoded._doc._id})
        .exec(function (err, dataPost) {
            res.json(dataPost);
        });
});

module.exports = router;