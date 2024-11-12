import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import HRDashboard from "./components/HRDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import RoleProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route
          path="/hr-dashboard"
          element={
            <RoleProtectedRoute requiredRole="hr">
              <HRDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <RoleProtectedRoute requiredRole="manager">
              <ManagerDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            <RoleProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Auth Page with both Login and Register components
// import Authentication from "./auth/Authentication";

// // Employee Pages
// import Dashboard from "./employees/Dashboard";
// import LeaveManagement from "./employees/LeaveManagement";
// import Profile from "./employees/Profile";
// import Schedule from "./employees/Schedule";
// import TaskList from "./employees/TaskList";
// import Training from "./employees/Training";
// import Announcements from "./employees/Announcements";
// import Career from "./employees/Career";

// // Manager Pages
// import ManagerDashboard from "./manager/ManagerDashboard";
// import ManagerLeaveRequests from "./manager/ManagerLeaveRequests";
// import ManagerShiftSchedule from "./manager/ManagerShiftSchedule";
// import ManagerReports from "./manager/ManagerReports";
// import ManagerTaskList from "./manager/TaskList";
// import ManagerProfile from "./manager/ManagerProfile";
// import ManagerCareer from "./manager/ManagerCareer";

// // HR Pages
// import AdminDashboard from "./hr/AdminDashboard";
// import CreatePost from "./hr/CreatePost";
// import LeaveForm from "./hr/LeaveForm";
// import SickLeaveForm from "./hr/SickLeaveForm";
// import HrAnnouncements from "./hr/HrAnnouncements";
// import HrCareer from "./hr/HrCareer";
// import HrProfile from "./hr/Profile"; // Correct import for HrProfile
// import HrRecruitment from "./hr/HrRecruitment";
// import HrReporting from "./hr/Reports"; // Correct import for HrReporting
// import HrTraining from "./hr/HrTraining";
// import CreateUser from "./hr/CreateUser";
// import AssignTraining from "./hr/AssignTraining";
// import EmployeeList from "./hr/EmployeeList";
// import ManageLeave from "./hr/ManageLeave";

// // Not Found Page
// import NotFound from "./components/NotFound";

// import "./App.css";

// const App = () => {
//   return (
//     <Router>
//       <div className="app-container">
//         <Routes>
//           {/* Combined Auth Page */}
//           <Route path="/" element={<Authentication />} />
//           {/* Employee Routes */}
//           <Route path="/employees/dashboard" element={<Dashboard />} />
//           <Route
//             path="/employees/leave-management"
//             element={<LeaveManagement />}
//           />
//           <Route path="/employees/profile" element={<Profile />} />
//           <Route path="/employees/schedule" element={<Schedule />} />
//           <Route path="/employees/tasklist" element={<TaskList />} />
//           <Route path="/employees/training" element={<Training />} />
//           <Route path="/employees/announcements" element={<Announcements />} />
//           <Route path="/employees/career" element={<Career />} />
//           {/* Manager Routes */}
//           <Route path="/manager/dashboard" element={<ManagerDashboard />} />
//           <Route
//             path="/manager/leave-requests"
//             element={<ManagerLeaveRequests />}
//           />
//           <Route
//             path="/manager/shift-schedule"
//             element={<ManagerShiftSchedule />}
//           />
//           <Route path="/manager/reporting" element={<ManagerReports />} />
//           <Route path="/manager/profile" element={<ManagerProfile />} />
//           <Route path="/manager/taskmanagement" element={<ManagerTaskList />} />
//           <Route path="/manager/career" element={<ManagerCareer />} />
//           {/* HR Routes */}
//           <Route path="/hr/AdminDashboard" element={<AdminDashboard />} />
//           <Route path="/hr/createpost" element={<CreatePost />} />
//           <Route path="/hr/leaveform" element={<LeaveForm />} />
//           <Route path="/hr/sickleaveform" element={<SickLeaveForm />} />
//           <Route path="/hr/announcements" element={<HrAnnouncements />} />
//           <Route path="/hr/reports" element={<HrReporting />} />{" "}
//           <Route path="/hr/recruitment" element={<HrRecruitment />} />
//           <Route path="/hr/training" element={<HrTraining />} />
//           <Route path="/hr/career" element={<HrCareer />} />
//           <Route path="/hr/profile" element={<HrProfile />} />{" "}
//           <Route path="/hr/createuser" element={<CreateUser />} />
//           <Route path="/hr/assigntraining" element={<AssignTraining />} />
//           <Route path="/hr/employeelist" element={<EmployeeList />} />
//           <Route path="/hr/manageleave" element={<ManageLeave />} />
//           {/* 404 Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
