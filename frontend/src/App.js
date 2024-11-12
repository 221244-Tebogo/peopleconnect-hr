import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import NotFound from "./components/NotFound";
import Announcements from "./components/Announcements";

// HR Pages
import AdminDashboard from "./hr/AdminDashboard";
import EmployeeList from "./hr/EmployeeList";
import HrTraining from "./hr/HRTraining";
import HrReporting from "./hr/Reports";
import AssignTraining from "./hr/AssignTraining";
import HrProfile from "./hr/Profile";
import HrCareer from "./hr/HRCareer";
import HRLeave from "./hr/HRLeave"; // Ensure this component exists

// Manager Pages
import ManagerDashboard from "./manager/ManagerDashboard"; // Ensure this component exists
import LeaveRequests from "./manager/LeaveRequests"; // Ensure this component exists
import ShiftSchedule from "./manager/ShiftSchedule"; // Ensure this component exists
import TeamReports from "./manager/TeamReports"; // Ensure this component exists
import TaskManagement from "./manager/TaskManagement"; // Ensure this component exists
import ManagerProfile from "./manager/ManagerProfile"; // Ensure this component exists
import ManagerLeave from "./manager/ManagerLeave"; // Ensure this component exists

// Employee Pages
import EmployeeDashboard from "./employee/EmployeeDashboard"; // Ensure this component exists
import LeaveManagement from "./employee/LeaveManagement"; // Ensure this component exists
import EmployeeProfile from "./employee/Profile"; // Ensure this component exists
import Schedule from "./employee/Schedule"; // Ensure this component exists
import Tasks from "./employee/Tasks"; // Ensure this component exists
import EmployeeTraining from "./employee/Training"; // Ensure this component exists
import Career from "./employee/Career"; // Ensure this component exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />

        {/* HR Routes */}
        <Route path="/hr">
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="employeelist" element={<EmployeeList />} />
          <Route path="training" element={<HrTraining />} />
          <Route path="reports" element={<HrReporting />} />
          <Route path="assigntraining" element={<AssignTraining />} />
          <Route path="profile" element={<HrProfile />} />
          <Route path="career-management" element={<HrCareer />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="leave-applications" element={<HRLeave />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager">
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="leave-requests" element={<ManagerLeave />} />
          <Route path="shift-schedule" element={<ShiftSchedule />} />
          <Route path="team-reports" element={<TeamReports />} />
          <Route path="taskmanagement" element={<TaskManagement />} />
          <Route path="profile" element={<ManagerProfile />} />
          <Route path="announcements" element={<Announcements />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employees">
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route
            path="dashboard/leave-management"
            element={<LeaveManagement />}
          />
          <Route path="dashboard/profile" element={<EmployeeProfile />} />
          <Route path="dashboard/schedule" element={<Schedule />} />
          <Route path="dashboard/tasks" element={<Tasks />} />
          <Route path="dashboard/training" element={<EmployeeTraining />} />
          <Route path="dashboard/career" element={<Career />} />
          <Route path="dashboard/announcements" element={<Announcements />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
