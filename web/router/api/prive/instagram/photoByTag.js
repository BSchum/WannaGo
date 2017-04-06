/**
 * Created by user on 06/04/2017.
 */
var router = require('express').Router();
var ig = require('instagram-node').instagram({})
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
    ;
    ig.use({access_token: '1436100658.940f801.5dd4847304df48f6bc3a6c0a5e09091d'});
    ig.media_search(48.4335645654, 2.345645645, function(err, medias, remaining, limit) {
        console.log(' err is : %j', err);
        console.log(' medias is : %j', medias);
        res.end();
    });

});

module.exports = router;
