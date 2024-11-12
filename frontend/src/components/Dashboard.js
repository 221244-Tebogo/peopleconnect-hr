// // src/components/Dashboard.js
// src/components/Dashboard.js
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
        navigate("/"); // Redirect if role is missing
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

// import React, { useEffect, useState } from "react";
// import HRSidebar from "./sidebar/HRSidebar";
// import ManagerSidebar from "./sidebar/ManagerSidebar";
// import EmployeeSidebar from "./sidebar/EmployeeSidebar";
// import "./Dashboard.css"; // Import CSS for styling

// const Dashboard = () => {
//   const [role, setRole] = useState(null);

//   // Retrieve the role from localStorage on component mount
//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     setRole(storedRole);
//   }, []);

//   // Function to select the correct sidebar based on role
//   const renderSidebar = () => {
//     switch (role) {
//       case "hr":
//         return <HRSidebar />;
//       case "manager":
//         return <ManagerSidebar />;
//       case "employee":
//         return <EmployeeSidebar />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="dashboard">
//       {/* Render the sidebar based on role */}
//       {renderSidebar()}
//       <div className="main-content">
//         <h1>Welcome to your Dashboard</h1>
//         <p>This is your main dashboard content area.</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
