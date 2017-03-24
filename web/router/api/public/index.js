/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();

router.use('/user',require('./user'));
//router.use('/admin', require('./admin'));

module.exports = router;