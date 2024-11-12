// src/employees/Training.js
import React from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";

const Training = () => {
  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Training</h1>
        <p>Here you can view training programs and enroll in new courses.</p>
        {/* Add additional functionality here, such as a list of available trainings */}
      </div>
    </div>
  );
};

export default Training;
