/**
 * Created by user on 04/04/2017.
 */
var router = require('express').Router();
var User = require('../../../../../models/User');
var Voyageur = require('../../../../../models/Voyageur');
var Commercant = require('../../../../../models/Commercant');


var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

options = {
    clientID: '290350911389056',
    clientSecret: '1ead6e6cd602958dc6ba96ec03aebbaa',
    callbackURL: "http://localhost:4500/api/public/user/authentification-facebook/callback",
    profileFields: ['email', 'displayName' ,'picture.type(large)', 'cover']
};


passport.use(
    new FacebookStrategy(
        options,
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate(profile.id, profile.emails[0].value, profile.displayName, profile.photos[0].value,
                profile._json.cover.source,
                function (err, result) {
                    if(result) {
                        result.facebook['access_token'] = accessToken;
                        result.save(function(err, doc) {

                            done(err, doc);
                        });
                    } else {
                        done(err, result);
                    }
                }
            );
        }
    )
);

passport.use(
    new BearerStrategy(
        function(token, done) {
            User.findOne({'facebook.access_token' : token}
            ,function(err, user) {
                    if(err) {
                        return done(err)
                    }
                    if(!user) {
                        return done(null, false)
                    }
                    return done(null, user, { scope: 'all' })
                }
            );
        }
    )
);

router.get(
    '/',
    passport.authenticate('facebook', { session: false, scope: ['email','user_photos'] })
);

router.get('/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: "/" }),
    function(req, res) {
        console.log("red.user : %j", req.user);
        res.redirect("profile?access_token=" + req.user.facebook.access_token);
    }
);

router.get(
    '/profile',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.send("LOGGED IN as " + req.user.profileId + " - <a href=\"/logout\">Log out</a>");
    }
);

router.post('/voyageur', function (req, res) {
    Voyageur
        .findOne({'profile' : req.user})
        .exec(function (err, user) {
            if(!user){
                var voyageur = Voyageur({
                    profile: req.user
                });
                voyageur
                    .save(function () {
                        res.json({
                            sucess: true,
                            voyageur: voyageur
                        });
                        res.end();
                    });
            }
            else
            {
                res.end();
            }
        })
})

router.post('/commercant', function (req, res) {
    Commercant
        .findOne({'profile' : req.user})
        .exec(function (err, user) {
            if(!user){
                var commercant = Commercant({
                    profile: req.user
                });
                commercant
                    .save(function () {
                        res.json({
                            sucess: true,
                            commercant: commercant
                        });
                        res.end();
                    });
            }
            else
            {
                res.end();
            }
        })
})
module.exports = router;