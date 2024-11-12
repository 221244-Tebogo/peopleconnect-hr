// src/manager/ManagerCareer.js
import React from "react";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

const ManagerCareer = () => {
  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>Career Development</h2>
        <p>Manage employee career development programs and resources.</p>
      </div>
    </div>
  );
};

export default ManagerCareer;
