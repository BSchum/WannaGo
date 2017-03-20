/**
 * Created by user on 17/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservation = new Schema({
    prix:{
        type:number,
        require:true
    },
    date:{
        type:Schema.Types.ObjectId, ref:"Date",
        require:true
    },
});
module.exports = mongoose.model('Reservation', reservationSchema);