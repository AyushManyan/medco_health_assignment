
const Doctor = require('../models/Doctor');
const Slot = require('../models/Slot');
const Token = require('../models/Token');

exports.createDoctor = async (req, res) => {
  const doctor = await Doctor.create({ name: req.body.name });
  res.json(doctor);
};

exports.addSlot = async (req, res) => {
  const slot = await Slot.create({
    doctorId: req.params.doctorId,
    ...req.body
  });
  res.json(slot);
};

// View full OPD schedule (slots + tokens)
exports.getSchedule = async (req, res) => {
  const slots = await Slot.find({ doctorId: req.params.doctorId });
  const result = [];

  for (const slot of slots) {
    const tokens = await Token.find({ slotId: slot._id, status: 'booked' })
      .sort({ priority: -1 });

    result.push({ slot, tokens });
  }

  res.json(result);
};