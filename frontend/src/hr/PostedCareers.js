// src/hr/PostedCareers.js
import React from "react";
import axios from "axios"; // Import axios for HTTP requests

const PostedCareers = ({ positions, fetchPositions, openModal }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/careers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPositions(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Manage Posted Careers</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position._id}>
              <td>{position.title}</td>
              <td>{position.department}</td>
              <td>{position.description}</td>
              <td>{position.duration} days</td>
              <td>
                {new Date(position.applicationDeadline).toLocaleDateString()}
              </td>
              <td>
                <button
                  onClick={() => openModal(position)}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(position._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostedCareers;
