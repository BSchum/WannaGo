var router = require('express').Router();

router.use('/search', require('./searchflight.js'));

module.exports = router;
