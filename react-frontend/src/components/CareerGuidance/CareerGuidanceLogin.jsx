import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests

const CareerGuidanceLogin = () => {
  const [unique_id, setUniqueId] = useState(''); // Changed from email to uniqueId
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error messages

    if (unique_id && password) {
      try {
        // Make an API call with uniqueId and password
        const response = await axios.post('https://your-backend-api.com/login', {
          unique_id, 
          password,
        });

        if (response.data.success) {
          localStorage.setItem('token', response.data.token); // Store token
          localStorage.setItem('userRole', 'career-guidance'); // Store role
          navigate('/dashboard/career-guidance'); // Navigate to the dashboard
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } catch (err) {
        setError('An error occurred. Please try again later.');
      }
    } else {
      setError('Please enter valid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Career Guidance Login
        </h2>

        {/* Error message display */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="uniqueId" className="block text-gray-700 font-medium mb-2">
              Unique ID
            </label>
            <input
              type="text"
              id="uniqueId"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)} // Update uniqueId state
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your unique ID"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareerGuidanceLogin;
