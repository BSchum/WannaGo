var router = require('express').Router();

var Commercant = require('../../../../models/Commerce');
var bodyParser = require('body-parser');

router.use(bodyParser.json());


router.put('/commerce',function(req,res){
    //Création d'un commerce via un ID.
    InscriptionCommerce(req,res);

});
var InscriptionCommerce = function(){
    var pays = req.body.pays;
    var adresse = res.body.adresse;
    var siren = res.body.siren;
    var photos = res.body.photos;
}
module.exports = router;