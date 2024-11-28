import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Book, 
  FileTextIcon, 
  VideoIcon, 
  CompassIcon 
} from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem('studentName');

  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.removeItem('studentName');
    navigate('/login');
  };

  const dashboardItems = [
    {
      title: 'Resume Builder',
      description: 'Create a professional resume with AI assistance',
      link: '/resume-builder',
      icon: FileTextIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Career Guidance',
      description: 'Get personalized career advice and recommendations',
      link: '/career-guidance',
      icon: CompassIcon,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'AI Consultation',
      description: 'Schedule an AI-powered career consultation call',
      link: '/call-feature',
      icon: VideoIcon,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Learning Resources',
      description: 'Access educational materials and study guides',
      link: '/resources',
      icon: Book,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Navbar with student's name and logout button */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Display student's name */}
            {studentName && (
              <span className="text-white text-xl font-medium">
                Welcome, {studentName}!
              </span>
            )}
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Items */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="border rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 flex items-center space-x-4">
                    <div className={`${item.color} p-3 rounded-full`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <Link 
                      to={item.link} 
                      className="w-full block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Access
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
