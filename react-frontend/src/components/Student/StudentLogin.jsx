import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [unique_id, setUniqueId] = useState(''); // Changed email to uniqueId
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // For error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    try {
      // Sending uniqueId and password to the backend for authentication
      const response = await axios.post('http://your-backend-url/auth/student', {
        unique_id, // Sending uniqueId instead of email
        password,
      });

      // Store authentication token and user role
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'student');

      // Navigate to the student dashboard
      navigate('/dashboard/student');
    } catch (error) {
      console.error('Login failed', error);
      // Handle login error by setting an error message
      setError('Invalid credentials. Please check your unique ID and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

        {/* Error message display */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text" // Changed to text for uniqueId
            placeholder="Student ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)} // Handle uniqueId change
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
