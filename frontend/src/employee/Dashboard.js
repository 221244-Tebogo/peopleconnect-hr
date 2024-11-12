//frontend/employees/Dashboard.js

import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({ name: "User", role: "Employee" });
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Employee Dashboard</h1>
          <p>Welcome, {userData.name}</p>
        </div>

        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="dashboard-actions-grid">
            <Link className="dashboard-btn" to="/hr/HRMainDashboard/createpost">
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              <span>Create Post</span>
            </Link>
            <Link
              className="dashboard-btn"
              to="/hr/HRMainDashboard/manageleave"
            >
              <i className="fa fa-calendar" aria-hidden="true"></i>
              <span>Manage Leave</span>
            </Link>
            <Link className="dashboard-btn" to="/hr/HRMainDashboard/reporting">
              <i className="fa fa-chart-bar" aria-hidden="true"></i>
              <span>Reporting</span>
            </Link>
            <Link className="dashboard-btn" to="/hr/HRMainDashboard/career">
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <span>Careers</span>
            </Link>
            <Link
              className="dashboard-btn"
              to="/hr/HRMainDashboard/announcements"
            >
              <i className="fa fa-bullhorn" aria-hidden="true"></i>
              <span>Announcements</span>
            </Link>
            <Link className="dashboard-btn" to="/hr/HRMainDashboard/hrtraining">
              <i className="fa fa-chalkboard-teacher" aria-hidden="true"></i>
              <span>Training</span>
            </Link>
            <Link className="dashboard-btn" to="/hr/HRMainDashboard/profile">
              <i className="fa fa-user" aria-hidden="true"></i>
              <span>Profile</span>
            </Link>
          </div>
        )}
        {/* Renders any child routes (e.g., /employees/leave-management) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
