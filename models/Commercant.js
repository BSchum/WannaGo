/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commercantSchema = new Schema({
    profile : {type: Schema.Types.ObjectId, ref: 'User'},
    commerce : [{type : Schema.Types.ObjectId , ref:'Commerce'}]
});

module.exports = mongoose.model('Voyageur', voyageurSchema);