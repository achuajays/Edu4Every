import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const [teacherId, setTeacherId] = useState(''); // Changed from email to teacherId
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send teacherId and password for authentication
      const response = await axios.post('http://your-backend-url/auth/teacher', {
        teacherId, // Sending teacherId instead of email
        password,
      });

      // Store authentication token and user role
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'teacher');

      // Navigate to teacher dashboard
      navigate('/dashboard/teacher');
    } catch (error) {
      console.error('Login failed', error);

      // Handle login error
      if (axios.isAxiosError(error)) {
        setError(
          (error.response && error.response.data && error.response.data.message) ||
          'Login failed. Please check your credentials.'
        );
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Teacher Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text" // Changed to text for teacherId
            placeholder="Teacher ID"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)} // Handle teacherId change
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
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
