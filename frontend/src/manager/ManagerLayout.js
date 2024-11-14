// ManagerLayout.js
import React from "react";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

const ManagerLayout = ({ children }) => {
  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default ManagerLayout;
