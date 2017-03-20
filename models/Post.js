/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    text : {type:string},
    photo : {type : Schema.Types.ObjectId , ref:'Photo'},
    lieu:{
        type: string,
        require:true
    },
    heure:{
        type:number,
        require:true
    }
});

module.exports = mongoose.model('Voyageur', voyageurSchema);