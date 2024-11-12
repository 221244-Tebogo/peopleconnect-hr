import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AssignedTraining = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5002/api/training/assignments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAssignments(response.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load training assignments.");
      }
    };

    fetchAssignments();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssignments = assignments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Assigned Trainings</h2>
      <table className="table table-striped table-hover mt-3">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Training Program</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Session Dates</th>
          </tr>
        </thead>
        <tbody>
          {currentAssignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>
                {assignment.employee.name} {assignment.employee.surname}
              </td>
              <td>{assignment.employee.email}</td>
              <td>{assignment.training.name}</td>
              <td>{assignment.training.description}</td>
              <td>{assignment.training.duration}</td>
              <td>
                {assignment.sessions.map((session, index) => (
                  <div key={index}>
                    {session.date}: {session.startTime} - {session.endTime}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastItem >= assignments.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssignedTraining;
