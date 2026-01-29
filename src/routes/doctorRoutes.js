const express = require('express');
const controller = require('../controllers/doctorContoller');

const router = express.Router();

router.post('/', controller.createDoctor);
router.post('/:doctorId/slots', controller.addSlot);
router.get('/:doctorId/schedule', controller.getSchedule);

module.exports = router;
