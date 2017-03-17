/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();

router.use('/user', require('./user'));

module.exports = router;