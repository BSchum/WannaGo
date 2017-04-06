/**
 * Created by user on 06/04/2017.
 */
var router = require('express').Router();

router.use('/photo', require('./photoByTag'));

module.exports = router;