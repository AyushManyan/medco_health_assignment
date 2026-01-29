const express = require('express');
const controller = require('../controllers/tokenController');

const router = express.Router();

router.post('/book', controller.bookToken);
router.post('/emergency', controller.emergencyToken);
router.post('/:tokenId/cancel', controller.cancelToken);

module.exports = router;