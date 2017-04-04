var router = require('express').Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');


var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.use("/api/public",require("./api/public"));
router.use("/",require("./front"));
router.use("/api/prive", passport.authenticate('jwt' , {session: false}), require("./api/prive"));

module.exports = router;