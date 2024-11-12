// src/components/HRDashboard.js
import React from "react";
import HRSidebar from "./sidebar/HRSidebar";

const HRDashboard = () => (
  <div className="dashboard">
    <HRSidebar />
    <div className="main-content">
      <h1>HR Dashboard</h1>
      <p>Welcome to the HR dashboard!</p>
    </div>
  </div>
);

export default HRDashboard;
