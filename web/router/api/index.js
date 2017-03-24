var router = require('express').Router();

router.use('/public',require('./public'));
router.use('/prive',require('./prive'));

module.exports = router;