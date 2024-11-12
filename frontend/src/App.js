// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import HRDashboard from "./components/HRDashboard";
import HrCareer from "./hr/HRCareer";
import Career from "./employee/Career";

// HR Pages
import AdminDashboard from "./hr/AdminDashboard";
import EmployeeList from "./hr/EmployeeList";

import HrReporting from "./hr/Reports";

import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        {/* HR Routes */}
        <Route path="/hr/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/hr/reports" element={<HrReporting />} />
        <Route path="/hr-career" element={<HrCareer />} />
        <Route path="/hr/employeelist" element={<EmployeeList />} />
        <Route path="/career" element={<Career />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Route */}
      </Routes>
    </Router>
  );
}

export default App;
