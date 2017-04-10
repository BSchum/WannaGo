/**
 * Created by user on 24/03/2017.
 */
var router = require('express').Router();

router.use('/information', require('./information'));
router.use('/modification', require('./modification'));

module.exports = router;