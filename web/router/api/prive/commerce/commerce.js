var router = require('express').Router();

var Commerce = require('../../../../../models/Commerce');
var Commercant = require('../../../../../models/Commercant');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiZGF0ZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJ1c2VybmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJkYXRlIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJkYXRlIjoiMjgvMDIvMjAyOSIsInBhc3N3b3JkIjoieTlEUjQ2SGRJVll6cjhmVEdXSVNxMURxcHcvVUNyaGl0dUphMElsR2piOD0iLCJlbWFpbCI6ImxvbG9AbG9sby5mciIsInVzZXJuYW1lIjoiT2xvaWNrIiwiX2lkIjoiNThkNTI5OTI2ZDM5ZWIxYjY4MjQxNTc1In0sImlhdCI6MTQ5MDM2NDgyNX0.IBsuh8FUxlg5lSv-K9YtVJABRW3uD4B30olT0jQw2Yk",process.env.SECRET, true);

router.use(bodyParser.json());

router.get('/commerce',function(req,res){
    res.send("Commerce");
});
router.put('/',function(req,res){
    //Création d'un commerce via un ID.
    InscriptionCommerce(req,res);

});
var InscriptionCommerce = function(req,res){
    var id = decoded._doc.username;
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
                    res.send("Commercant saved: "+commercantDoc);
                });
            });
            res.end();
            console.log("here"+err);
        });
        
};


module.exports = router;