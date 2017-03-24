/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();

router.use('/register', require('./register.js'));
//router.use('/authentification', require('./../public/authentification'));

module.exports = router;