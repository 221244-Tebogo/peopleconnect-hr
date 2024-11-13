import React from "react";
import { useNavigate } from "react-router-dom";
import HRSidebar from "./sidebar/HRSidebar";
import ManagerSidebar from "./sidebar/ManagerSidebar";
import EmployeeSidebar from "./sidebar/EmployeeSidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const renderSidebar = () => {
    switch (role) {
      case "hr":
        return <HRSidebar />;
      case "manager":
        return <ManagerSidebar />;
      case "employee":
        return <EmployeeSidebar />;
      default:
        navigate("/");
    }
  };

  return (
    <div className="dashboard">
      {renderSidebar()}
      <div className="main-content">
        <h1>Welcome to your Dashboard</h1>
        <p>This is your main dashboard content area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
