var router = require('express').Router();

var Commercant = require('../../../../../models/Commercant');

router.get("/",function(req,res){
    Commercant
    .find({},function(err,commercantDoc){
        res.send(commercantDoc);
    });
});

module.exports = router;
