import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeTraining = () => {
  const [assignedTrainings, setAssignedTrainings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedTrainings = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5002/api/training/assignments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAssignedTrainings(response.data);
      } catch (err) {
        console.error("Error fetching assigned trainings:", err);
        setError("Failed to load assigned trainings.");
      }
    };

    fetchAssignedTrainings();
  }, []);

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h1>Assigned Training Programs</h1>
        <p>
          Welcome to your training dashboard! Here, you will find a list of
          training programs assigned to you, including descriptions, durations,
          and available sessions.
        </p>

        {error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div>
            {assignedTrainings.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Program Name</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedTrainings.map((assignment) => (
                    <tr key={assignment._id}>
                      <td>{assignment.training.name}</td>
                      <td>{assignment.training.description}</td>
                      <td>{assignment.training.duration}</td>
                      <td>
                        {assignment.sessions.map((session, index) => (
                          <div key={index}>
                            <strong>Date:</strong> {session.date} <br />
                            <strong>Time:</strong> {session.startTime} -{" "}
                            {session.endTime}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No training programs have been assigned to you yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTraining;
