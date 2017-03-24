/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();

router.use('/register', require('./register'));

module.exports = router;