/**
 * Created by user on 26/03/2017.
 */
var router = require('express').Router();
var Post = require('../../../../../models/Post');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());

// Affiche tous les Post de l'utilisateur connecter
router.get('/myPost', function (req,res) {
    return Post
        .find({author: req.user._id})
        .exec(function (err, dataPost) {
            res.json(dataPost);
        });
});

module.exports = router;