/**
 * Created by user on 21/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentaireSchema = new Schema({
    author : {type: Schema.Types.ObjectId , ref:'User'},
    description: {type : String},
    date: {type: String}
});

module.exports = mongoose.model('Commentaire', commentaireSchema);
