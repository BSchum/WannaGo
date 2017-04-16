/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();
var Photo = require('../../../../../models/Photo');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.put('/', function (req,res) {
    console.log('Register photo');
    InscriptionPhoto(req,res);
});

var InscriptionPhoto = function(req,res) {
    var url = req.body.url;
    var date = req.body.date;
    var description = req.body.description;

    savePhoto(description, url, date, req, res);
};

var savePhoto = function(description, url, date, req, res){
    var photo = Photo({
        url: url,
        date: date,
        description: description
    });
    photo
        .save(function (err) {
            console.log(err);
            res.send("Photo registered : "+photo);
            res.end();
        });
};

module.exports = router;
