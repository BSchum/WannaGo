/**
 * Created by user on 21/03/2017.
 */
var router = require('express').Router();

router.use('/register', require('./register'));
router.use('/information', require('./information'));

module.exports = router;