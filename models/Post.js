/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    author : {type: Schema.Types.ObjectId , ref:'User'},
    photo : {type : Schema.Types.ObjectId , ref:'Photo'},
    commentaires: [{type: Schema.Types.ObjectId , ref:'Commentaire'}]
});

module.exports = mongoose.model('Post', postSchema);