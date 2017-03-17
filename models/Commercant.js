/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<<<<<<< HEAD
var commercantSchema = new Schema({
    profile : {type: Schema.Types.ObjectId, ref: 'User'},
    commerce : [{type : Schema.Types.ObjectId , ref:'Commerce'}]
=======
var Schema = new Schema({
    commerce : {type: Schema.Types.ObjectId, ref: 'User'},
    post : [{type : Schema.Types.ObjectId , ref:'Post'}],
    reservation : [{type: Schema.Types.ObjectId, ref:'Reservation'}]
>>>>>>> 0bd1581c5bb115c23314310c82d71d950f0d1cef
});

module.exports = mongoose.model('Voyageur', voyageurSchema);