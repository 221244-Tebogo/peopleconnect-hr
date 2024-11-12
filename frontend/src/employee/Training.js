import React from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeTraining = () => {
  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Assigned Training Programs</h1>
        <p>
          Welcome to your training dashboard! Here, you will find a list of
          training programs assigned to you, including descriptions, durations,
          and available sessions.
        </p>
        <p>
          This page will soon provide more details about each assigned training
          so that you can stay updated and participate in relevant programs.
        </p>
      </div>
    </div>
  );
};

export default EmployeeTraining;
