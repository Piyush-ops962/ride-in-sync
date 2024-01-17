import React, { useState } from 'react';
import axios from 'axios';
// import { browserHistory } from 'react-router';
import { useNavigate} from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'traveler', // You can set a default role or provide options for the user to choose
  });

  const navigate = useNavigate();
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/register', formData);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      // Handle registration error, e.g., display error message to the user
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="traveler">Traveler</option>
            <option value="companion">Companion</option>
            {/* Add more roles if needed */}
          </select>
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
