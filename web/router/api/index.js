var router = require('express').Router();

router.use('/user',require('./user'));
router.use('/commerce',require('./commerce'));

module.exports = router;