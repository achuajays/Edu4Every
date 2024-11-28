import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UsersIcon, 
  BarChartIcon, 
  LightbulbIcon ,
  BriefcaseIcon
} from 'lucide-react';

const CareerGuidanceDashboard = () => {
  // Retrieve the career guidance user's name from localStorage
  const userName = localStorage.getItem('userName');

  const dashboardItems = [
    { 
        title: 'Career Guidance', 
        description: 'Get personalized career advice and recommendations', 
        link: '/dashboard/career-guidance', 
        icon: BriefcaseIcon, 
        color: 'bg-green-100 text-green-600' },
    {
        title: 'Resume Builder',
        description: 'Create a professional resume with AI assistance',
        link: '/resume-builder',
        icon: FileTextIcon,
        color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Job Search Assistance',
      description: 'Get help finding the right job opportunities',
      link: '/job-search',
      icon: UsersIcon,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Interview Preparation',
      description: 'Prepare for interviews with mock interviews and tips',
      link: '/interview-preparation',
      icon: LightbulbIcon,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Navbar with user's name */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Career Guidance Dashboard</h1>
          {/* Display user's name */}
          {userName && (
            <span className="text-white text-xl font-medium">
              Welcome, {userName}!
            </span>
          )}
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
                      className="w-full block text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
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

export default CareerGuidanceDashboard;
