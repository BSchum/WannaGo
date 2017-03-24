var router = require('express').Router();

router.use('/register', require('./commerce.js'));

module.exports = router;