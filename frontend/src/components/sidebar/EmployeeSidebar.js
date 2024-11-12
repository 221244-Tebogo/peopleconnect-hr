// src/components/sidebar/EmployeeSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const EmployeeSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Employee Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/my-tasks">My Tasks</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeSidebar;
