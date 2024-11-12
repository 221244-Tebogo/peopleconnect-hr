// src/hr/PostedCareers.js
import React from "react";
import axios from "axios";

const PostedCareers = ({ positions, fetchPositions, openModal }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position._id}>
              <td>{position.title}</td>
              <td>{position.description}</td>
              <td>{position.department}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => openModal(position)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    await axios.delete(
                      `http://localhost:5002/api/careers/${position._id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    fetchPositions();
                  }}
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
