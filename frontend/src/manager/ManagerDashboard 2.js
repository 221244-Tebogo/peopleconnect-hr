//frontend/pages/manager/ManagerDashboard.js
import React from "react";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

import "./Manager.css";

const ManagerDashboard = () => {
  return (
    <div className="container-grid">
      <aside className="navbar-left">
        <ManagerSidebar />
      </aside>

      <main className="main-content">
        <div className="welcome-container">
          <h1 className="welcome-message">Welcome, Manager!</h1>
          <p className="welcome-description">
            Here you can manage your team, approve leave, schedule shifts, and
            more.
          </p>
        </div>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <i className="fa fa-history"></i>
            <h3>Leave History</h3>
            <p>View detailed leave history for your employees.</p>
          </div>

          <div className="dashboard-card">
            <i className="fa fa-calendar-alt"></i>
            <h3>Shift Scheduling</h3>
            <p>
              Manage your team's shifts effectively and ensure proper
              scheduling.
            </p>
          </div>

          <div className="dashboard-card">
            <i className="fa fa-user-graduate"></i>
            <h3>Career Development</h3>
            <p>Track career development programs and performance reviews.</p>
          </div>

          <div className="dashboard-card">
            <i className="fa fa-bullhorn"></i>
            <h3>Announcements</h3>
            <p>Keep up-to-date with the latest company announcements.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;
