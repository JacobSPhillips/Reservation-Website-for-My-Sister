const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationsSchema = new Schema({
    name: String,
    date: String,
    startTime: String,
    endTime: String
})

module.exports = mongoose.model('Reservation', ReservationsSchema)