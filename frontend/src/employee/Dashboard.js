import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

const EmployeeDashboard = () => {
  const [userData, setUserData] = useState({
    name: "Employee",
    role: "Employee",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5002/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        console.log("User Data:", res.data);
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
        <div className="welcome-container text-center my-4">
          <h1 className="welcome-message">
            Welcome, {userData.name || "Employee"}!
          </h1>
          <p className="welcome-description">
            Access your dashboard to manage your tasks, view updates, and track
            your progress.
          </p>
        </div>

        {error ? (
          <p className="alert alert-danger">{error}</p>
        ) : (
          <div className="dashboard-cards row text-center">
            <div className="dashboard-card col-md-3 mb-4">
              <Link
                to="/employee/employee-leave"
                className="card h-100 shadow-sm"
              >
                <div className="card-body">
                  <i className="fa fa-calendar fa-2x mb-3"></i>
                  <h5 className="card-title">Leave Management</h5>
                  <p className="card-text">
                    View your leave balance and history.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/employee/training" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-chalkboard-teacher fa-2x mb-3"></i>
                  <h5 className="card-title">Training</h5>
                  <p className="card-text">
                    Track your assigned training programs.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link to="/employee/career" className="card h-100 shadow-sm">
                <div className="card-body">
                  <i className="fa fa-briefcase fa-2x mb-3"></i>
                  <h5 className="card-title">Career Development</h5>
                  <p className="card-text">
                    Monitor your career growth and performance.
                  </p>
                </div>
              </Link>
            </div>

            <div className="dashboard-card col-md-3 mb-4">
              <Link
                to="/employee/announcements"
                className="card h-100 shadow-sm"
              >
                <div className="card-body">
                  <i className="fa fa-bullhorn fa-2x mb-3"></i>
                  <h5 className="card-title">Announcements</h5>
                  <p className="card-text">
                    Stay updated with the latest company news.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
