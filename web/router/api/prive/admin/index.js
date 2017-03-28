var router = require('express').Router();

router.use('/voyageur', require('./voyageur'));
router.use('/commercant', require('./commercant'));

module.exports = router;