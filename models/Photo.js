/**
 * Created by user on 21/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    url : {type:String, require:true},
    date:{type:String, require:true}
});

module.exports = mongoose.model('Photo', photoSchema);