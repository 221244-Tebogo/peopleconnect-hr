import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import NotFound from "./components/NotFound";
// import Announcements from "./components/Announcements"; // Commented out

// HR Pages
import AdminDashboard from "./hr/AdminDashboard";
import EmployeeList from "./hr/EmployeeList";
import HrTraining from "./hr/HRTraining";
import HrReporting from "./hr/Reports";
import AssignTraining from "./hr/AssignTraining";
import HrProfile from "./hr/Profile";
import HrCareer from "./hr/HRCareer";
import HRLeave from "./hr/HRLeave";

// Manager Pages
import ManagerDashboard from "./manager/ManagerDashboard";
import ManagerLeave from "./manager/ManagerLeave";
// import ShiftSchedule from "./manager/ShiftSchedule"; // Commented out
import TeamReports from "./manager/ManagerReports";
import TaskManagement from "./manager/TaskManagement";
import ManagerProfile from "./manager/ManagerProfile";

// Employee Pages
import EmployeeDashboard from "./employee/Dashboard";
import LeaveManagement from "./employee/LeaveManagement";
import EmployeeProfile from "./employee/Profile";
import Schedule from "./employee/Schedule";
import Tasks from "./employee/TaskList";
import Training from "./employee/Training";
import Career from "./employee/Career";

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
          {/* <Route path="announcements" element={<Announcements />} /> */}
          <Route path="leave-applications" element={<HRLeave />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager">
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="leave-requests" element={<ManagerLeave />} />
          {/* <Route path="shift-schedule" element={<ShiftSchedule />} /> */}
          <Route path="team-reports" element={<TeamReports />} />
          <Route path="taskmanagement" element={<TaskManagement />} />
          <Route path="profile" element={<ManagerProfile />} />
          {/* <Route path="announcements" element={<Announcements />} /> */}
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
          <Route path="dashboard/training" element={<Training />} />
          <Route path="dashboard/career" element={<Career />} />
          {/* <Route path="dashboard/announcements" element={<Announcements />} /> */}
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
