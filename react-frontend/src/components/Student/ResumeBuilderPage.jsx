import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const ResumeBuilderPage = () => {
  // State to handle form data and generated resume
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: 'high_school',
    degree: '',
    skills: '',
    experience: '',
    projects: '',
    job_title: ''
  });

  const [generatedResume, setGeneratedResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Handle form field input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset previous errors

    try {
      const response = await axios.post(
        'https://5940-111-92-80-102.ngrok-free.app/process_carrier_guidance/process-guidance',
        JSON.stringify(formData),
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      setGeneratedResume(response.data.advice); // Display the generated resume
    } catch (error) {
      console.error('Resume generation error:', error);
      setError('Error generating resume. Please try again later.'); // Set error state for display
    } finally {
      setIsSubmitting(false); // Enable button again after the submission
    }
  };

  // Function to download the generated resume as a PDF
  const downloadPDF = () => {
    if (!generatedResume) return;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Generated Resume", 10, 10);
    
    // Split the resume into lines for better formatting in PDF
    const lines = generatedResume.split('\n');
    lines.forEach((line, index) => {
      doc.text(line, 10, 20 + (index * 10));
    });

    doc.save('generated_resume.pdf');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start justify-center">
      {/* Resume Builder Form */}
      <div className="bg-white shadow-xl rounded-xl p-6 w-full md:w-1/2">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Resume Builder</h1>
        
        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email & Phone Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Education & Degree Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Education Level</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Degree/Major</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          {/* Skills, Experience, Projects, Job Title Inputs */}
          {['skills', 'experience', 'projects', 'job_title'].map((field, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-medium mb-2">{field.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Describe your ${field.replace(/_/g, ' ')}`}
              ></textarea>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Generating...' : 'Generate Resume'}
          </button>
        </form>
      </div>

      {/* Display Generated Resume */}
      {generatedResume && (
        <div className="bg-white shadow-xl rounded-xl p-6 w-full md:w-[40%] mt-6 md:mt-0 md:ml-[20px]">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Generated Resume</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{generatedResume}</pre>
          
          {/* Download Button */}
          <button 
            onClick={downloadPDF} 
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors" 
          >
            Download Resume as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilderPage;