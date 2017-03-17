/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();

router.use('/register', require('./register.js'));

module.exports = router;