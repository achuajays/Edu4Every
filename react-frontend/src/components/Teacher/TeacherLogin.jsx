import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {
  const [teacherId, setTeacherId] = useState(''); // Changed to teacherId
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before starting login process

    try {
      // Send teacherId and password for authentication
      const response = await axios.post('http://your-backend-url/auth/teacher', {
        teacher_id: teacherId,
        password,
      });

      // Assuming response contains teacher's name and teacherId
      const { name, teacher_id } = response.data;

      // Store teacher information in localStorage
      localStorage.setItem('teacherName', name);
      localStorage.setItem('teacherId', teacher_id);

      // Navigate to teacher dashboard
      navigate('/dashboard/teacher');
    } catch (error) {
      console.error('Login failed', error);

      // Handle login error properly
      if (axios.isAxiosError(error)) {
        // Handle errors from the backend response
        setError(
          (error.response && error.response.data && error.response.data.message) ||
          'Login failed. Please check your credentials.'
        );
      } else {
        // Handle unexpected errors
        setError('An unexpected error occurred. Please try again later.');
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
