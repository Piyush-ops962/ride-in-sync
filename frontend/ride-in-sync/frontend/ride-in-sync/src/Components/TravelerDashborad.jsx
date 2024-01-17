import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/TravelerPage.css';
import {useNavigate} from 'react-router-dom';

const TravelerPage = () => {
  const [rideDetails, setRideDetails] = useState({
    tripId: '',
    driverName: '',
    driverPhone: '',
    cabNumber: '',
    stops:  [{ name: '', hasReached: false }],
  });

  const [ridesList, setRidesList] = useState([]);

const navigate= useNavigate();

  const handleChange = (e) => {
    setRideDetails({ ...rideDetails, [e.target.name]: e.target.value });
  };

  const handleAddStop = () => {
    setRideDetails({ ...rideDetails, stops: [...rideDetails.stops, ''] });
  };

  const handleRemoveStop = (index) => {
    const updatedStops = [...rideDetails.stops];
    updatedStops.splice(index, 1);
    setRideDetails({ ...rideDetails, stops: updatedStops });
  };

  const handleStopChange = (event, index) => {
    const { name, value, checked, type } = event.target;

    const updatedStops = rideDetails.stops.map((stop, stopIndex) =>
      stopIndex === index
        ? {
            ...stop,
            [name]: type === 'checkbox' ? checked : value,
          }
        : stop
    );
    setRideDetails({ ...rideDetails, stops: updatedStops });
  };

  const handleAddRide = async () => {
    console.log(rideDetails)
    try {
      const response = await axios.post('http://localhost:8000/rides/initiate', rideDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(response.data);

      fetchRidesList();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const currentUser=localStorage.getItem('userID');

  const fetchRidesList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/rides/getAllRides', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRidesList(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleDelete = async (_id) => {
    console.log(_id);
    try{
      const response = await axios.delete(`http://localhost:8000/rides/delete/${_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
      );
      console.log(response.data);
      fetchRidesList();
    }catch (error) {
      console.error(error.response.data);
    }
  }

  const handleEdit= (_id)=>{
    console.log(_id);
    navigate(`/rides/${_id}`);
  }
  
  const handleShare= (_id)=>{
    console.log(_id);
    navigate(`/rides/${_id}`);
  }


  useEffect(() => {
    fetchRidesList();
  }, []);

  return (
    <div className="traveler-container">
      <h2>Traveler Page</h2>

      <div className="form-container">
        <label htmlFor="tripId">Trip ID:</label>
        <input type="text" name="tripId" value={rideDetails.tripId} onChange={handleChange} />

        <label htmlFor="driverName">Driver Name:</label>
        <input type="text" name="driverName" value={rideDetails.driverName} onChange={handleChange} />

        <label htmlFor="driverPhone">Driver Phone:</label>
        <input type="text" name="driverPhone" value={rideDetails.driverPhone} onChange={handleChange} />

        <label htmlFor="cabNumber">Cab Number:</label>
        <input type="text" name="cabNumber" value={rideDetails.cabNumber} onChange={handleChange} />

        <div>
          <label>Stops:</label>
          {rideDetails.stops.map((stop, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder={`Stop ${index + 1} Name`}
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
              {rideDetails.stops.length > 1 && (
                <button type="button" onClick={() => handleRemoveStop(index)}>
                  Remove Stop
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddStop}>
            Add Stop
          </button>
        </div>

        <button type="button" className="submitBtn" onClick={handleAddRide}>
          Add Ride
        </button>
      </div>

      <div className="rides-list-container">
        <h3>Your Active Rides</h3>
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
              currentUser===ride.createdBy ?
              (<tr key={ride._id}>
                <td>{ride.tripId}</td>
                <td>{ride.driverName}</td>
                <td>{ride.driverPhone}</td>
                <td>{ride.cabNumber}</td>
                <td>
                <button type="button" onClick={() => handleEdit(ride._id)}>Update Stops</button>
                <button type="button" onClick={() => handleDelete(ride._id)}>End</button>
                </td>
              </tr>) :
              <></>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rides-list-container">
        <h3>Avaliavle Rides</h3>
        <table>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Driver Name</th>
              <th>Ride Details</th>
              <th>Cab Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ridesList.map((ride) => (
              currentUser !== ride.createdBy ?
              (<tr key={ride._id}>
                <td>{ride.tripId}</td>
                <td>{ride.driverName}</td>
                <td>{ride.stops[0].name}
                <span> --- </span>
                {ride.stops[ride.stops.length-1].name}
                </td>
                <td>{ride.cabNumber}</td>
                <td>
                <button type="button" onClick={() => handleShare(ride._id)}>Share</button>
                </td>
              </tr>    
              ) 
              :
              <></>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TravelerPage;
