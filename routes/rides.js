const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');

router.post('/initiate', rideController.initiateRide);
router.get('/getAllRides', rideController.getAllRides);
router.delete('/delete/:rideId', rideController.deleteRide);
router.get('/getRide/:rideId', rideController.getRide);
router.put('/update/:rideId', rideController.updateRide);

module.exports = router;
