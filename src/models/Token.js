const mongoose = require('mongoose');

module.exports = mongoose.model('Token', new mongoose.Schema({
  doctorId: mongoose.Schema.Types.ObjectId,
  slotId: mongoose.Schema.Types.ObjectId,
  patientType: String,
  priority: Number,
  status: { type: String, default: 'booked' }
}));
