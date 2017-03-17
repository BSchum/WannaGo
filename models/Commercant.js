/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voyageurSchema = new Schema({
    profile : {type: Schema.Types.ObjectId, ref: 'User'},
    post : [{type : Schema.Types.ObjectId , ref:'Post'}],
    reservation : [{type: Schema.Types.ObjectId, ref:'Reservation'}]
});

module.exports = mongoose.model('Voyageur', voyageurSchema);