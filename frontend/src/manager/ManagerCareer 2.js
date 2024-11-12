import React, { useState, useEffect } from "react";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";
import axios from "axios";

const ManagerCareer = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/careers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching career positions:", error);
      }
    };
    fetchPositions();
  }, []);

  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>Career Opportunities</h2>
        <ul>
          {positions.map((position) => (
            <li key={position._id}>
              <h3>{position.title}</h3>
              <p>{position.description}</p>
              <p>
                <strong>Department:</strong> {position.department}
              </p>
              <p>
                <strong>Duration:</strong> {position.duration} days
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {new Date(position.expiryDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagerCareer;
