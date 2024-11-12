// src/components/Settings.js
import React, { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement theme toggling logic here
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    // Implement notification setting logic here
  };

  return (
    <div>
      <h1>Settings Page</h1>
      <p>Configure your preferences here.</p>

      <div className="settings-section">
        <h2>Appearance</h2>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleToggleDarkMode}
          />
          Dark Mode
        </label>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={handleToggleEmailNotifications}
          />
          Email Notifications
        </label>
      </div>

      <div className="settings-section">
        <h2>Account</h2>
        <button onClick={() => alert("Change Password")}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Settings;
