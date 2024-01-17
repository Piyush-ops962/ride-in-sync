const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSchema = new Schema({
    tripId: { type: String, required: true },
  driverName: { type: String, required: true },
  driverPhone: { type: String, required: true },
  cabNumber: { type: String, required: true },
  stops: [{
    name: {
        type: String,
        required: true
    },
    hasReached: {
        type: Boolean,
        default: false
    }
}],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  companions : {type : String}
});

module.exports = mongoose.model('Ride', rideSchema);
