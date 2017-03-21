var router = require('express').Router();

router.use('/user',require('./user'));
router.use('/commerce',require('./commerce'));
router.use('/photo', require('./photo'));
<<<<<<< HEAD
router.use('/commentaire', require('./commentaire'));
router.use('/post', require('./post'));
=======
router.use('/admin', require('./admin'));

>>>>>>> c5ed79cf263ee6eacd1c99d12674b83335efe084

module.exports = router;