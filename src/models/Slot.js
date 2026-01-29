const mongoose = require('mongoose');

module.exports = mongoose.model('Slot', new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  startTime: String,
  endTime: String,
  maxCapacity: Number
}));
