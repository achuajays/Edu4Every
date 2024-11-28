// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './components/LandingPage/LandingPage';
// import StudentLogin from './components/Student/StudentLogin';
// import TeacherLogin from './components/Teacher/TeacherLogin';
// import StudentDashboard from './components/Student/StudentDashboard';
// import TeacherDashboard from './components/Teacher/TeacherDashboard';
// import CareerGuidanceDashboard from './components/CareerGuidance/CareerGuidancePage';
// import CareerGuidanceLogin from './components/CareerGuidance/CareerGuidanceLogin'; // Added this import
// import CallFeaturePage from './components/Student/CallFeaturePage';
// import ResumeBuilderPage from './components/Student/ResumeBuilderPage';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-background">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
          
//           {/* Authentication Routes */}
//           <Route path="/auth/student" element={<StudentLogin />} />
//           <Route path="/auth/teacher" element={<TeacherLogin />} />
//           <Route path="/auth/career-guidance" element={<CareerGuidanceLogin />} />
          
//           {/* Protected Dashboard Routes */}
//           <Route
//             path="/dashboard/student"
//             element={
//               <ProtectedRoute role="student">
//                 <StudentDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dashboard/teacher"
//             element={
//               <ProtectedRoute role="teacher">
//                 <TeacherDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dashboard/career-guidance"
//             element={
//               <ProtectedRoute role="career-guidance">
//                 <CareerGuidanceDashboard />
//               </ProtectedRoute>
//             }
//           />
          
//           {/* Feature Routes */}
//           <Route path="/call-feature" element={<CallFeaturePage />} />
//           <Route path="/resume-builder" element={<ResumeBuilderPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// // Simple Protected Route Component
// const ProtectedRoute = ({ children, role }) => {
//   // In a real app, check authentication status and role
//   const isAuthenticated = localStorage.getItem('token') !== null;
//   const userRole = localStorage.getItem('userRole');
  
//   if (!isAuthenticated || userRole !== role) {
//     return <Navigate to="/" replace />;
//   }
  
//   return children;
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import StudentLogin from './components/Student/StudentLogin';
import TeacherLogin from './components/Teacher/TeacherLogin';
import StudentDashboard from './components/Student/StudentDashboard';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import CareerGuidancePage from './components/CareerGuidance/CareerGuidancePage';
import CareerGuidanceDashboard from './components/CareerGuidance/CareerGuidanceDashboard';
import CareerGuidanceLogin from './components/CareerGuidance/CareerGuidanceLogin'; // Added this import
import CallFeaturePage from './components/Student/CallFeaturePage';
import ResumeBuilderPage from './components/Student/ResumeBuilderPage';
import CustomerService from './components/chat/CustomerService';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication Routes */}
          <Route path="/auth/student" element={<StudentLogin />} />
          <Route path="/auth/teacher" element={<TeacherLogin />} />
          <Route path="/auth/career-guidance" element={<CareerGuidanceLogin />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/career-guidance" element={<CareerGuidancePage />} />
          <Route path="/dashboard/service-dashboard" element={<CustomerService />} />
          <Route path="/dashboard/career-guidance-dashboard" element={<CareerGuidanceDashboard />} />
          
          {/* Feature Routes */}
          <Route path="/call-feature" element={<CallFeaturePage />} />
          <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
