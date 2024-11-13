import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import axios from "axios";

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("/api/careers", {
          headers: { Authorization: localStorage.getItem("token") },
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
    if (files) {
      setApplicationData({ ...applicationData, [name]: files[0] });
    } else {
      setApplicationData({ ...applicationData, [name]: value });
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", applicationData.name);
    formData.append("email", applicationData.email);
    formData.append("coverLetter", applicationData.coverLetter);
    formData.append("resume", applicationData.resume);

    try {
      const response = await axios.post(
        `/api/careers/apply/${selectedPosition._id}`,
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage("Failed to submit application. Please try again.");
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get("/api/careers", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching career positions:", error);
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
              <p>
                <strong>Location:</strong> {position.location}
              </p>
              <p>
                <strong>Salary Range:</strong> {position.salaryRange || "N/A"}
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
                  value={applicationData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cover Letter:</label>
                <textarea
                  name="coverLetter"
                  value={applicationData.coverLetter}
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
