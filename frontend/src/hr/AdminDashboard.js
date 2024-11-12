// frontend/src/hr/AdminDashboard.js

import React from "react";
import { Link } from "react-router-dom";
import HRSidebar from "../components/sidebar/HRSidebar";

const AdminDashboard = () => {
  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h1>HR Admin Dashboard</h1>
        <p>Quick Links:</p>
        <Link to="/employees/manage" className="btn-link">
          Manage Employees
        </Link>
        <Link to="/reports" className="btn-link">
          Generate Reports
        </Link>
        <Link to="/hr/HRMainDashboard/announcements" className="btn-link">
          Announcements
        </Link>
        <Link to="/hr/HRMainDashboard/career" className="btn-link">
          Career Opportunities
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
