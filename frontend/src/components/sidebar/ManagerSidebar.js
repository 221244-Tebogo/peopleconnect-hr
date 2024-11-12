// src/components/sidebar/ManagerSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const ManagerSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Manager Dashboard</h2>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/team-overview">Team Overview</Link>
        </li>
        <li>
          <Link to="/project-status">Project Status</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default ManagerSidebar;
