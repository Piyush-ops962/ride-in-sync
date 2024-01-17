const express = require('express');
const router = express.Router();
const companionController = require('../controllers/companionController');

router.get('/rides', companionController.getAvailableRides);
router.post('/share/:rideId', companionController.shareRide);
router.post('/feedback/:rideId', companionController.submitFeedback);

module.exports = router;
