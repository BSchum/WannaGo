/**
 * Created by user on 13/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   username : {
       type: String,
        required: true
   },
    email : {
       type: String,
        required: true
   },
    password : {
       type:String
   },
    date:{
       type: String
    },
    photo:{
       type: String
    },
    cover:{
       type: String
    },
    facebook: {
        profileId: {
            type: Number
        },
        access_token: {
            type: String
        }
    }
});

var User = mongoose.model('User', userSchema);
User.findOrCreate = function(id, email, username, photo, cover, cb) {
    User.findOne({"facebook.profileId":id}, function(err, user) {
        console.log('Ici : ' + user);
        if(!user) {
            var user = User({'facebook.profileId': id,
                email: email,
                username: username,
                photo: photo,
                cover: cover});
            user
                .save(function(rs) {
                //console.log("model user : "+ user);
                cb(null, user);
            })
        }else {
            cb(null, user);
        }

    });
}

module.exports = User;