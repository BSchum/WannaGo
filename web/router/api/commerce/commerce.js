var router = require('express').Router();

var Commerce = require('../../../../models/Commerce');
var Commercant = require('../../../../models/Commercant');

var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/commerce',function(req,res){
    res.send("Commerce");
});
router.put('/',function(req,res){
    //Création d'un commerce via un ID.
    InscriptionCommerce(req,res);

});
var InscriptionCommerce = function(req,res){
    var id = req.body.id;
    var pays = req.body.pays;
    var adresse = req.body.adresse;
    var siren = req.body.siren;
    var siteweb = req.body.siteweb;
    var echelleTarif = req.body.echelleTarif;


    saveCommerce(id,pays,adresse,siren,siteweb,echelleTarif,req,res);
};

var saveCommerce = function(id,pays,adresse,siren,siteweb,echelleTarif,req,res){
    var commerce = Commerce({
        pays: pays,
        adresse: adresse,
        siren: siren,
        siteweb: siteweb,
        echelleTarif: echelleTarif
    });
    commerce
        .save(
        function(err){
            Commercant.findOne({_id:id},function(err,commercantDoc){
                console.log(commercantDoc)
                commercantDoc.commerce.push(commerce);
                commercantDoc.save(function(err,req,res){
                    console.log(err);
                });
            });
            res.end();
        });
}
            console.log("here"+err);
        });  
};
module.exports = router;