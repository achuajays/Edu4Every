import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const AuthButton = ({ text, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 w-full sm:w-auto text-white rounded-lg transform transition-all hover:scale-105 focus:outline-none ${className}`}
    >
      {text}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-teal-400">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          Edu4Every
        </h1>
        <p className="text-lg sm:text-xl text-gray-100 mb-10">
          Empowering Education Through AI
        </p>

        <div className="grid gap-4 sm:flex sm:justify-center sm:gap-6">
          <AuthButton
            text="Student Login"
            onClick={() => navigate('/auth/student')}
            className="bg-blue-600 hover:bg-blue-700 shadow-md"
          />
          <AuthButton
            text="Teacher Login"
            onClick={() => navigate('/auth/teacher')}
            className="bg-green-600 hover:bg-green-700 shadow-md"
          />
          <AuthButton
            text="Career Guidance"
            onClick={() => navigate('/auth/career-guidance')}
            className="bg-purple-600 hover:bg-purple-700 shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
