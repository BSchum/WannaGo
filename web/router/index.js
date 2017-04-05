var router = require('express').Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');

router.use("/api/public",require("./api/public"));
router.use("/",require("./front"));
router.use("/api/prive", passport.authenticate('bearer' , {session: false}), require("./api/prive"));

module.exports = router;