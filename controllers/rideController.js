const Ride = require('../models/Ride');

exports.initiateRide = async (req, res) => {
  try{
  const ride = new Ride({
    tripId: req.body.tripId,
    driverName: req.body.driverName,
    driverPhone: req.body.driverPhone,
    cabNumber: req.body.cabNumber,
    stops: req.body.stops,
    createdBy: req.user.userId,
    companions :'',
  });
  await ride.save();

  res.status(201).json({ message: 'Ride added successfully', ride });
} catch (error) {
  res.status(500).json({ message: 'Error adding ride', error: error.message });
}
};

exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find();

    res.status(200).json(rides);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error retrieving rides', error: error.message });
  }
};


exports.deleteRide = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    console.log(rideId)

    const deletedRide = await Ride.findByIdAndDelete(rideId);

    if (!deletedRide) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json({ message: 'Ride deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ride', error: error.message });
  }
};


exports.getRide = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    console.log(rideId);
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving ride details', error: error.message });
  }
};

exports.updateRide = async (req, res) => {
  try {
    const rideId = req.params.rideId;
    const updatedRideData = req.body; 
    console.log(req.body);
    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    ride.tripId = updatedRideData.tripId;
    ride.driverName = updatedRideData.driverName;
    ride.driverPhone = updatedRideData.driverPhone;
    ride.cabNumber = updatedRideData.cabNumber;
    ride.stops = updatedRideData.stops;

    const updatedRide = await ride.save();

    res.status(200).json(updatedRide);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ride details', error: error.message });
  }
};