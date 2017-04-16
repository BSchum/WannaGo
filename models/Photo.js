/**
 * Created by user on 21/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
    url : {type:String},
    date:{type:String},
    description:{type: String}
});

module.exports = mongoose.model('Photo', photoSchema);
