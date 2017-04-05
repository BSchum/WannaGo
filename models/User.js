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
       type:String,
        //required: true
   },
    date:{
       type: String,
        //required: true
    },
    facebook: {
        profileId: {
            type: Number
            //required: true
        },
        access_token: {
            type: String
        }
    }
});

var User = mongoose.model('User', userSchema);
User.findOrCreate = function(id, email, username, cb) {
    console.log('id is is is %j', id)
    User.findOne({"facebook.profileId":id}, function(err, user) {
        console.log('Ici : ' + user);
        if(!user) {
            var user = User({'facebook.profileId': id,
                email: email,
                username: username});
            console.log("user " + user);
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