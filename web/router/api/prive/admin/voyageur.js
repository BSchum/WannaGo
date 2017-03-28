var router = require('express').Router();

var Voyageur = require('../../../../../models/Voyageur');

router.get("/",function(req,res){
    Voyageur
    .find({},function(err,voyageurDoc){
        res.send(voyageurDoc);
    });
});

module.exports = router;