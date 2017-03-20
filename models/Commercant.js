/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commercantSchema = new Schema({
    profile : {type: Schema.Types.ObjectId, ref: 'User'},
    commerce : [{type: Schema.Types.ObjectId, ref: 'Commerce'}],
    post : [{type : Schema.Types.ObjectId , ref:'Post'}],
    reservation : [{type: Schema.Types.ObjectId, ref:'Reservation'}]
});

module.exports = mongoose.model('Commercant', commercantSchema);