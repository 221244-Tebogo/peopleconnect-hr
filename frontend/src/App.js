import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import NotFound from "./components/NotFound";

// HR Pages
import AdminDashboard from "./hr/AdminDashboard";
import EmployeeList from "./hr/EmployeeList";
import HrTraining from "./hr/HRTraining";
import HrReporting from "./hr/Reports";
import AssignTraining from "./hr/AssignTraining";
import HrProfile from "./hr/Profile";
import HrCareer from "./hr/HRCareer";
import HRLeave from "./hr/HRLeave";
import HRAnnouncements from "./hr/HRAnnouncements";

// Manager Pages
import ManagerDashboard from "./manager/ManagerDashboard";
import ManagerLeave from "./manager/ManagerLeave";
import ManagerShiftSchedule from "./manager/ManagerShiftSchedule";
import TeamReports from "./manager/ManagerReports";
import TaskManagement from "./manager/TaskManagement";
import ManagerProfile from "./manager/ManagerProfile";
import ManagerAnnouncement from "./manager/ManagerAnnouncement";
import ManagerTeam from "./manager/ManagerTeam";

// Employee Pages
import EmployeeDashboard from "./employee/Dashboard";
import EmployeeProfile from "./employee/Profile";
import Schedule from "./employee/Schedule";
import Tasks from "./employee/TaskList";
import Training from "./employee/Training";
import Career from "./employee/Career";
import EmployeeLeave from "./employee/EmployeeLeave";
import Announcements from "./employee/Announcements";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Authentication />} />

          {/* HR Routes */}
          <Route path="/hr">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="training" element={<HrTraining />} />
            <Route path="reports" element={<HrReporting />} />
            <Route path="assign-training" element={<AssignTraining />} />
            <Route path="profile" element={<HrProfile />} />
            <Route path="career" element={<HrCareer />} />
            <Route path="leave" element={<HRLeave />} />
            <Route path="announcements" element={<HRAnnouncements />} />
          </Route>

          {/* Manager Routes */}
          <Route path="/manager">
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="leave-requests" element={<ManagerLeave />} />
            <Route path="shift-schedule" element={<ManagerShiftSchedule />} />
            <Route path="reports" element={<TeamReports />} />
            <Route path="task-management" element={<TaskManagement />} />
            <Route path="profile" element={<ManagerProfile />} />
            <Route path="team" element={<ManagerTeam />} />
            <Route path="announcement" element={<ManagerAnnouncement />} />
          </Route>

          {/* Employee Routes */}
          <Route path="/employee">
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="profile" element={<EmployeeProfile />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="training" element={<Training />} />
            <Route path="career" element={<Career />} />
            <Route path="employee-leave" element={<EmployeeLeave />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
