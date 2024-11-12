import React, { useEffect } from "react";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

const ManagerProfile = ({ user }) => {
  useEffect(() => {
    if (user && user.name) {
      console.log(`Manager Name: ${user.name}`);
    } else {
      console.log("User data is not available.");
    }
  }, [user]); // useEffect will run when 'user' prop changes

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
