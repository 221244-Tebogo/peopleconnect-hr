import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const HRAdminDashboard = () => {
  const [adminData, setAdminData] = useState({
    name: "Admin",
    role: "HR Admin",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5002/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(res.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to fetch admin data");
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <div className="welcome-container text-center my-4">
          <h1 className="welcome-message">Welcome, {adminData.name}!</h1>
          <p className="welcome-description">
            Access your HR dashboard to manage employee data, monitor leave,
            generate reports, and more.
          </p>
        </div>

        {error ? (
          <p className="alert alert-danger">{error}</p>
        ) : (
          <div className="dashboard-cards row text-center">
            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/hr/employee-list" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-users fa-2x mb-3"></i>
                  <h5 className="card-title">Employee List</h5>
                  <p className="card-text">View and manage all employees.</p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/hr/leave" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-calendar-alt fa-2x mb-3"></i>
                  <h5 className="card-title">Manage Leave</h5>
                  <p className="card-text">
                    Oversee leave requests and balances.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/hr/reports" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-chart-line fa-2x mb-3"></i>
                  <h5 className="card-title">Reports</h5>
                  <p className="card-text">
                    Generate HR and performance reports.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/hr/training" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-chalkboard-teacher fa-2x mb-3"></i>
                  <h5 className="card-title">Training</h5>
                  <p className="card-text">
                    Manage training programs for employees.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/hr/career" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-briefcase fa-2x mb-3"></i>
                  <h5 className="card-title">Career Management</h5>
                  <p className="card-text">
                    Oversee career development and opportunities.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/hr/announcements" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-bullhorn fa-2x mb-3"></i>
                  <h5 className="card-title">Announcements</h5>
                  <p className="card-text">
                    Post and manage company announcements.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRAdminDashboard;
