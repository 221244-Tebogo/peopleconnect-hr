// src/pages/employees/Announcements.js
import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import axios from "axios";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/api/announcements", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Announcements</h1>
        <ul>
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <h3>{announcement.title}</h3>
              <p>{announcement.message}</p>
              <p>
                <strong>Date:</strong> {announcement.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcements;
