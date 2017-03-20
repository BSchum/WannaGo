/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commerceSchema = new Schema({
    pays:{
        type:String,
        require:true
    },
    adresse:{
        type:String,
        require:true
    },
    siren:{
        type:String,
        require:true
    },
    photos:[{
        type:Schema.Types.ObjectId, ref:"Photos"
    }],
    siteweb:{
        type:String
    },
    echelleTarif:{
        type:String
    }



});
module.exports = mongoose.model('Commerce', commerceSchema);