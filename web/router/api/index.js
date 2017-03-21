var router = require('express').Router();

router.use('/user',require('./user'));
router.use('/commerce',require('./commerce'));
router.use('/photo', require('./photo'));

module.exports = router;