import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [unique_id, setUniqueId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://a1e5-111-92-80-102.ngrok-free.app/student/login', {
        unique_id, // Send uniqueId instead of email
        password,
      });

      // Store the student's name in localStorage after successful login
      localStorage.setItem('studentName', response.data.name);
      localStorage.setItem('Id', unique_id);
      localStorage.setItem('userRole', 'student');

      // Navigate to student dashboard
      navigate('/dashboard/student');
    } catch (error) {
      console.error('Login failed', error);
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
            type="text"
            placeholder="Student ID"
            value={unique_id}
            onChange={(e) => setUniqueId(e.target.value)}
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
