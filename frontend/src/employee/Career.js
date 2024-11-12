// src/employee/Career.js
import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import axios from "axios";

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/careers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching career positions:", error);
      }
    };
    fetchPositions();
  }, []);

  const handleApply = (position) => {
    setSelectedPosition(position);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", applicationData.name);
    formData.append("email", applicationData.email);
    formData.append("resume", applicationData.resume);
    formData.append("position", selectedPosition._id);

    try {
      await axios.post("http://localhost:5002/api/apply", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Career Opportunities</h1>
        <ul>
          {positions.map((position) => (
            <li key={position._id}>
              <h3>{position.title}</h3>
              <p>{position.description}</p>
              <p>
                <strong>Department:</strong> {position.department}
              </p>
              <button onClick={() => handleApply(position)}>Apply</button>
            </li>
          ))}
        </ul>

        {selectedPosition && (
          <div className="application-form">
            <h2>Apply for {selectedPosition.title}</h2>
            <form onSubmit={handleSubmitApplication}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Upload Resume:</label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Submit Application</button>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;
