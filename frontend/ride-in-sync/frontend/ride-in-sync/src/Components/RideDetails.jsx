import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Styles/RideDetails.css';

const RideDetails = () => {
  const [rideDetails, setRideDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    tripId: '',
    driverName: '',
    driverPhone: '',
    cabNumber: '',
    stops: [],
    companions :[]
  });

  const { id } = useParams();
  useEffect(() => {
    const fetchRideDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/rides/getRide/${id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
        setRideDetails(response.data);
        setEditedDetails(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchRideDetails();
  }, [id]);

  const currentUser = localStorage.getItem('userID');
  const currentUserName = localStorage.getItem('userName');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails({ ...editedDetails, [name]: value });
  };

  const handleStopChange = (e, index) => {
    const { name, value, checked, type } = e.target;

    const updatedStops = editedDetails.stops.map((stop, stopIndex) =>
      stopIndex === index
        ? {
            ...stop,
            [name]: type === 'checkbox' ? checked : value,
          }
        : stop
    );

    setEditedDetails({ ...editedDetails, stops: updatedStops });
  };

  const handleShareRide = ()=>{
    setEditedDetails({ ...editedDetails, companions: currentUserName });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update ride details
      await axios.put(`http://localhost:8000/rides/update/${id}`, editedDetails, 
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Refresh the ride details after updating
      const response = await axios.get(`http://localhost:8000/rides/getride/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRideDetails(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  

  return (
    (!rideDetails) ?
      (<span>Loading ride details...</span>)
      :
      (
        (currentUser === rideDetails.createdBy) ?
          <div className="ride-details-container text-center">
            <h2>Edit Ride Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Existing form fields */}
              <label><strong>Trip ID:</strong></label>
              <input
                type="text"
                name="tripId"
                value={editedDetails.tripId}
                onChange={handleInputChange}
                required
              />

              <label><strong>Driver Name:</strong></label>
              <input
                type="text"
                name="driverName"
                value={editedDetails.driverName}
                onChange={handleInputChange}
                required
              />

              {/* ... other fields ... */}

              {/* Stops */}
        <label><strong>Stops:</strong></label>
        <div className="stops-line">
          {editedDetails.stops.map((stop, index) => (
            <div key={index} className="stop-item">
              <input
                type="text"
                name="name"
                value={stop.name}
                onChange={(e) => handleStopChange(e, index)}
              />
              <input
                type="checkbox"
                name="hasReached"
                checked={stop.hasReached}
                onChange={(e) => handleStopChange(e, index)}
              />
              <label>Reached</label>
            </div>
          ))}
        </div>

              <button type="submit" className="btn btn-primary mt-3">Save Changes</button>
            </form>
          </div>
          :
          <div className="ride-details-container text-center">
            <h2>Ride Details</h2>
            <p><strong>Trip ID:</strong> {rideDetails.tripId}</p>
            <p><strong>Driver Name:</strong> {rideDetails.driverName}</p>
            <p><strong>Driver Phone:</strong> {rideDetails.driverPhone}</p>
            <p><strong>Cab Number:</strong> {rideDetails.cabNumber}</p>
            <p><strong>Companion:</strong>{rideDetails.companions}</p>
            <p><strong>Stops:</strong></p>
            <div className="stops-line">
              {rideDetails.stops.map((stop, index) => (
                <span key={index} className={`stop-item ${stop.hasReached ? 'stop-reached' : ''}`}>
                  {stop.name}
                </span>
              ))}
            </div>
            <button className="btn btn-primary mt-3 " onClick={handleShareRide}>Share Ride</button>
          </div>
      )

  );
};

export default RideDetails;
