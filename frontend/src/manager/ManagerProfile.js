import React from "react";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

const ManagerProfile = ({ user }) => {
  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>Profile</h2>
        <p>Manager Name: {user && user.name}</p>
        <p>Email: {user && user.email}</p>
      </div>
    </div>
  );
};

export default ManagerProfile;
