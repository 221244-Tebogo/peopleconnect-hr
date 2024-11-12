import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../assets/Logo.svg";

const EmployeeSidebar = () => {
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
        <Link to="/employees/dashboard" className="link">
          <i className="fa fa-home" aria-hidden="true"></i> Dashboard
        </Link>
        <Link to="/employees/dashboard/leave-management" className="link">
          <i className="fa fa-calendar" aria-hidden="true"></i> Leave Management
        </Link>
        <Link to="/employees/dashboard/profile" className="link">
          <i className="fa fa-user" aria-hidden="true"></i> My Profile
        </Link>
        <Link to="/employees/dashboard/schedule" className="link">
          <i className="fa fa-clock" aria-hidden="true"></i> My Schedule
        </Link>
        <Link to="/employees/dashboard/tasks" className="link">
          <i className="fa fa-tasks" aria-hidden="true"></i> My Tasks
        </Link>
        <Link to="/employees/dashboard/training" className="link">
          <i className="fa fa-chalkboard-teacher" aria-hidden="true"></i>{" "}
          Training
        </Link>
        <Link to="/employees/dashboard/announcements" className="link">
          <i className="fa fa-bullhorn" aria-hidden="true"></i> Announcements
        </Link>
        <Link to="/employees/dashboard/career" className="link">
          <i className="fa fa-briefcase" aria-hidden="true"></i> Career
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          <i className="fa fa-sign-out-alt" aria-hidden="true"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
