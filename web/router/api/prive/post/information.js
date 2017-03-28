/**
 * Created by user on 26/03/2017.
 */
var router = require('express').Router();
var Post = require('../../../../../models/Post');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
require('../../../../../config/index');

router.use(bodyParser.json());

var decoded = jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiZGF0ZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJ1c2VybmFtZSI6ImluaXQiLCJfX3YiOiJpbml0IiwiX2lkIjoiaW5pdCJ9LCJzdGF0ZXMiOnsiaWdub3JlIjp7fSwiZGVmYXVsdCI6e30sImluaXQiOnsiX192Ijp0cnVlLCJkYXRlIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJkYXRlIjoiMjgvMDIvMjAyOSIsInBhc3N3b3JkIjoieTlEUjQ2SGRJVll6cjhmVEdXSVNxMURxcHcvVUNyaGl0dUphMElsR2piOD0iLCJlbWFpbCI6ImxvbG9AbG9sby5mciIsInVzZXJuYW1lIjoiT2xvaWNrIiwiX2lkIjoiNThkNTI5OTI2ZDM5ZWIxYjY4MjQxNTc1In0sImlhdCI6MTQ5MDM2NDgyNX0.IBsuh8FUxlg5lSv-K9YtVJABRW3uD4B30olT0jQw2Yk",process.env.SECRET, true);

// Affiche tous les Post de l'utilisateur connecter
router.get('/myPost', function (req,res) {
    return Post
        .find({author: decoded._doc._id})
        .exec(function (err, dataPost) {
            res.json(dataPost);
        });
});

module.exports = router;