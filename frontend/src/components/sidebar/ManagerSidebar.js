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
          Home
        </Link>
        <Link to="/manager/leave-requests" className="link">
          Approve Leave
        </Link>
        <Link to="/manager/shift-schedule" className="link">
          Shift Scheduling
        </Link>{" "}
        <Link to="/manager/reporting" className="link">
          Team Reports
        </Link>
        <Link to="/manager/taskmanagement" className="link">
          Task Management
        </Link>
        <Link to="/manager/profile" className="link">
          My Profile
        </Link>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ManagerSidebar;
