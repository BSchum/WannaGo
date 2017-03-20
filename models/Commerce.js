/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commerceSchema = new Schema({
    pays:{
        type:string,
        require:true
    },
    adresse:{
        type:string,
        require:true
    },
    siren:{
        type:string,
        require:true
    },
    photos:[{
        type:Schema.Types.ObjectId, ref:"Photos"
    }],
    siteweb:{
        type:string
    },
    echelleTarif:{
        type:string
    }



});
module.exports = mongoose.model('Commerce', commerceSchema);