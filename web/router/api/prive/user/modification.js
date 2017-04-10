/**
 * Created by user on 07/04/2017.
 */
var router = require('express').Router();

var User = require('../../../../../models/User')
var bodyParser = require('body-parser');
var hash = require('../../../../../helper/hash');

router.use(bodyParser.json());

router.post('/password', function (req,res) {
    User
        .findOne({_id : req.user._id}, function (err, user) {
            var nwPassword = req.body.password;
            if(nwPassword != null)
            {
                user.password = hash.hashPassword(nwPassword);
                user.save(function (err, user) {
                    console.log('Success : %j', user);
                    res.end();
                })
            }
            else
            {
                res.json({ success: false, message: 'Password is null' });
            }
        })
})
module.exports = router;