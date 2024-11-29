import React, { useState } from 'react';
import axios from 'axios';

const CallFeaturePage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [skill, setSkill] = useState('');
  const [level, setLevel] = useState('beginner');
  const [courseOutput, setCourseOutput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initiateCall = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic phone number validation
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setCallStatus('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setCallStatus('');

    try {
        const response = await axios.post(
            'https://a1e5-111-92-80-102.ngrok-free.app/initiate-call/initiate-call',
            {
              number: phoneNumber,
            },
            {
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
      
      setCallStatus(response.data.message || 'Call initiated successfully');
    } catch (error) {
      // Error handling
      if (axios.isAxiosError(error)) {
        setCallStatus(
          error.response?.data?.message || 'Failed to initiate call. Please try again.'
        );
      } else {
        setCallStatus('An unexpected error occurred');
      }
      console.error('Call initiation failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCourse = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        'https://a1e5-111-92-80-102.ngrok-free.app/ai-learning-cource/generate-course',
        new URLSearchParams({ skill, level }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      // Assuming the backend returns course details
      setCourseOutput(response.data.course || 'Course generated successfully');
    } catch (error) {
      console.error('Course generation failed', error);
      setCourseOutput('Failed to generate course. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 w-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">AI Course Generator</h2>
        
        <form onSubmit={generateCourse} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Skill (e.g., Python)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Generate Course
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
        >
          AI Call Assistant
        </button>

        {courseOutput && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Generated Course:</h3>
            {courseOutput.split('\n').map((line, index) => (
            <p key={index} className="text-gray-700 mb-1">
                {line}
            </p>
            ))}
        </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 w-screen h-screen bg-white bg-opacity-70 backdrop-blur-lg">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center">Enter Phone Number</h2>
              <form onSubmit={initiateCall} className="space-y-4">
                <input
                  type="tel"
                  placeholder="Enter Phone Number (e.g., +1234567890)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {callStatus && (
                  <div
                    className={`p-3 rounded-lg text-center ${
                      callStatus.includes('successfully') 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {callStatus}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2 rounded-lg text-white transition-colors ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isLoading ? 'Initiating Call...' : 'Initiate Call'}
                </button>
              </form>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallFeaturePage;