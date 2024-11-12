// src/components/sidebar/HRSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const HRSidebar = () => (
  <div className="sidebar">
    <h2>HR Sidebar</h2>
    <ul>
      <li>
        <Link to="/hr-dashboard">Dashboard</Link>
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

export default HRSidebar;
