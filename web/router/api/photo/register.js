/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();
var Commerce = require('../../../../models/Commerce');
var Photo = require('../../../../models/Photo');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.put('/', function (req,res) {
    InscriptionPhoto(req,res);
});

var InscriptionPhoto = function(req,res) {
    var url = req.body.url;
    var date = req.body.date;

    savePhoto(url, date, req, res);
};

var savePhoto = function(url, date, req, res){
    var photo = Photo({
        url: url,
        date: date
    });
    photo
        .save(
            function(err){
                if(err)
                {
                    res.json({ success: true, message: 'Votre photo est enregistré' });
                }
                else
                {
                    res.json({ success: true, message: 'Votre photo est enregistré' })
                }
                res.end();
            });
};

module.exports = router;
