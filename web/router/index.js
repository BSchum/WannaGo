/**
 * Created by user on 13/03/2017.
 */
var router = require('express').Router();

router.use("/api", require('./api'));
router.use('/', require('./front'));
module.exports = router;