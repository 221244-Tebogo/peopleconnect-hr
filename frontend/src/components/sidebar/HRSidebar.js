// src/components/sidebar/HRSidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/Logo.svg";

const HRSidebar = () => {
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
        <Link to="/hr/dashboard" className="link">
          <i className="fa fa-home" aria-hidden="true"></i> Home
        </Link>
        <Link to="/hr/leave" className="link">
          <i className="fa fa-calendar-alt" aria-hidden="true"></i> Manage Leave
        </Link>
        <Link to="/hr/reports" className="link">
          <i className="fa fa-chart-line" aria-hidden="true"></i> Reports
        </Link>
        <Link to="/hr/training" className="link">
          <i className="fa fa-chalkboard-teacher" aria-hidden="true"></i>{" "}
          Training
        </Link>
        <Link to="/hr/profile" className="link">
          <i className="fa fa-user" aria-hidden="true"></i> Profile
        </Link>
        <Link to="/hr/career" className="link">
          <i className="fa fa-briefcase" aria-hidden="true"></i> Career
          Management
        </Link>
        <Link to="/hr/announcements" className="link">
          <i className="fa fa-bullhorn" aria-hidden="true"></i> Announcements
        </Link>
        <Link to="/hr/employee-list" className="link">
          <i className="fa fa-users" aria-hidden="true"></i> Employee List
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fa fa-sign-out-alt" aria-hidden="true"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default HRSidebar;
