import React from "react";
import HRSidebar from "../components/sidebar/HRSidebar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const HRAdminDashboard = () => {
  return (
    <div className="container-grid">
      <aside className="navbar-left">
        <HRSidebar />
      </aside>

      <main className="main-content">
        <div className="welcome-container">
          <h1 className="welcome-message">HR Admin Dashboard</h1>
          <p className="quick-links">Quick Links:</p>
        </div>

        <div className="dashboard-cards">
          <Link to="/manage-employees" className="dashboard-card">
            <i className="fa fa-users"></i>
            <h3>Manage Employees</h3>
            <p>View and manage employee records efficiently.</p>
          </Link>

          <Link to="/generate-reports" className="dashboard-card">
            <i className="fa fa-chart-line"></i>
            <h3>Generate Reports</h3>
            <p>Create detailed reports on employee performance.</p>
          </Link>

          <Link to="/announcements" className="dashboard-card">
            <i className="fa fa-bullhorn"></i>
            <h3>Announcements</h3>
            <p>Stay informed with the latest announcements.</p>
          </Link>

          <Link to="/career-opportunities" className="dashboard-card">
            <i className="fa fa-briefcase"></i>
            <h3>Career Opportunities</h3>
            <p>Explore career opportunities and progression paths.</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HRAdminDashboard;
