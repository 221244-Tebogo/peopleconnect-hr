import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/Logo.svg";

const ManagerSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="People Connect Logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-links">
        <Link to="/manager/dashboard" className="link">
          <i className="fa fa-home" aria-hidden="true"></i> Dashboard
        </Link>
        <Link to="/manager/task-management" className="link">
          <i className="fa fa-tasks" aria-hidden="true"></i> Task Management
        </Link>
        <Link to="/manager/leave-requests" className="link">
          <i className="fa fa-calendar-check" aria-hidden="true"></i> Leave
          Requests
        </Link>
        <Link to="/manager/reports" className="link">
          <i className="fa fa-chart-line" aria-hidden="true"></i> Reports
        </Link>
        <Link to="/manager/announcements" className="link">
          <i className="fa fa-bullhorn" aria-hidden="true"></i> Announcements
        </Link>
        <Link to="/manager/profile" className="link">
          <i className="fa fa-user" aria-hidden="true"></i> Profile
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fa fa-sign-out-alt" aria-hidden="true"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
