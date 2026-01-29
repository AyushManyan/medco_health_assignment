const priority = require('../config/priority');
const Doctor = require('../models/Doctor');
const Slot = require('../models/Slot');
const service = require('../services/tokenService');

exports.bookToken = async (req, res) => {
    if (!priority[req.body.patientType]) {
        res.status(400).json({ error: 'Invalid patient type' });
        throw new Error('Invalid patient type');
    }
    try {
        const validDoctorId = await Doctor.findById(req.body.doctorId);
        if (!validDoctorId) {
            res.status(400).json({ error: 'Doctor not found' });
            throw new Error('Doctor not found');
        }
        const validSlotId = await Slot.findById(req.body.slotId);
        if (!validSlotId) {
            res.status(400).json({ error: 'Slot not found' });
            throw new Error('Slot not found');
        }
        const token = await service.book(req.body);
        res.json(token);

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.emergencyToken = async (req, res) => {
    try {
        const token = await service.book({ ...req.body, patientType: 'emergency' });
        res.json(token);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.cancelToken = async (req, res) => {
    await service.cancel(req.params.tokenId);
    res.json({ status: 'cancelled' });
};
