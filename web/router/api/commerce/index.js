var router = require('express').Router();

router.use('/commerce', require('./commerce.js'));

module.exports = router;