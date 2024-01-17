import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate =useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/login', formData);
      console.log(response.data);
      const role=response.data.role;
      const token=response.data.token;
      const userID=response.data.userId;
      const userName=response.data.username;
      localStorage.setItem('token', token);
      localStorage.setItem('userID', userID);
      localStorage.setItem('userName', userName);
      if(role==="traveler")
      navigate('/traveler');
      else
      navigate('/companion')

    } catch (error) {
      console.error(error.response.data);
      // Handle login error, e.g., display error message to the user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
