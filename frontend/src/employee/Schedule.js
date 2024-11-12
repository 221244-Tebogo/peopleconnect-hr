import React from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const Schedule = () => {
  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>My Schedule</h1>
        <p>View your work schedule and shifts here.</p>
      </div>
    </div>
  );
};

export default Schedule;
