import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Book, 
  MessageSquare, 
  Bot 
} from 'lucide-react';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // Get the logged-in teacher's name from localStorage
  const teacherName = localStorage.getItem('teacherName');

  // Logout handler
  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.removeItem('teacherName');
    navigate('/login');
  };

  const dashboardItems = [
    {
      title: 'Student Progress',
      description: 'Monitor and analyze student performance',
      link: '/student-tracking',
      icon: BarChart3,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Course Management',
      description: 'Create and manage course content',
      link: '/course-management',
      icon: Book,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'AI Teaching Assistant',
      description: 'Get AI-powered teaching recommendations',
      link: '/ai-teaching-assistant',
      icon: Bot,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Communication Hub',
      description: 'Connect with students and manage communications',
      link: '/communication',
      icon: MessageSquare,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Navbar */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Display teacher's name */}
            {teacherName && (
              <span className="text-white text-xl font-medium">
                Welcome, {teacherName}!
              </span>
            )}
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-all"
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

export default TeacherDashboard;
