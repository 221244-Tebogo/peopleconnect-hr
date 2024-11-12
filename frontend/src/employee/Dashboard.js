import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "./Dashboard.css"; // Assuming App.css has all global styles

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
        <div className="welcome-section">
          <h1 className="welcome-message">Welcome, {userData.name}</h1>
          <p className="welcome-description">
            Access your dashboard for managing tasks and updates.
          </p>
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
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
