/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();

router.use('/commerce',require('./commerce'));
router.use('/photo', require('./photo'));
router.use('/commentaire', require('./commentaire'));
router.use('/post', require('./post'));
router.use('/user', require('./user'));

module.exports = router;