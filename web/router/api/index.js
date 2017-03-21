var router = require('express').Router();

router.use('/user',require('./user'));
router.use('/commerce',require('./commerce'));
router.use('/photo', require('./photo'));
router.use('/commentaire', require('./commentaire'));
router.use('/post', require('./post'));

module.exports = router;