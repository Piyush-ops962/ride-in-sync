import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../Styles/CompanionPage.css'; // Import the CSS file

const CompanionPage = () => {
  const [ridesList, setRidesList] = useState([]);
  // const [selectedRide, setSelectedRide] = useState(null);

  // const history = useHistory();

  const fetchRidesList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rides/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRidesList(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleShareRide = (rideId) => {
  //   // Redirect to the tracking page with the selected ride ID
console.log(rideId);
    // history.push(`/companion/track/${rideId}`);
  };

  useEffect(() => {
    // Fetch the list of rides when the component mounts
    fetchRidesList();
  }, []);

  return (
    <div className="companion-container">
      <h2>Companion Page</h2>

      <div className="rides-list-container">
        <h3>Rides List</h3>
        <table>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Driver Name</th>
              <th>Driver Phone</th>
              <th>Cab Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ridesList.map((ride) => (
              <tr key={ride._id}>
                <td>{ride.tripId}</td>
                <td>{ride.driverName}</td>
                <td>{ride.driverPhone}</td>
                <td>{ride.cabNumber}</td>
                <td>
                  <button type="button" onClick={() => handleShareRide(ride._id)}>Share Ride</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanionPage;
