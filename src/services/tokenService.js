const Token = require('../models/Token');
const Slot = require('../models/Slot');
const PRIORITY = require('../config/priority');

exports.book = async ({ doctorId, slotId, patientType }) => {
  const slot = await Slot.findById(slotId);
  if (!slot) throw new Error('Slot not found');

  const tokens = await Token.find({ slotId, status: 'booked' })
    .sort({ priority: -1 });

  const newToken = new Token({
    doctorId,
    slotId,
    patientType,
    priority: PRIORITY[patientType]
  });

  //Slot has space
  if (tokens.length < slot.maxCapacity) {
    return await newToken.save();
  }

  //Slot full → priority replacement
  const lowestPriorityToken = tokens[tokens.length - 1];

  if (newToken.priority > lowestPriorityToken.priority) {
    await Token.findByIdAndUpdate(lowestPriorityToken._id, { status: 'cancelled' });
    return await newToken.save();
  }

  // Slot full with higher priority patients
  throw new Error('Slot full');
};

exports.cancel = async (tokenId) => {
  await Token.findByIdAndUpdate(tokenId, { status: 'cancelled' });
};
