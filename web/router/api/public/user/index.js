/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();

router.use('/register', require('./register.js'));
router.use('/authentification', require('./authentification'));
router.use('/authentification-facebook', require('./authentification-facebook'));

module.exports = router;