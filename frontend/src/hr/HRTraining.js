// src/hr/HRTraining.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

// Components for modals
import AssignTraining from "./AssignTraining";
import EditTraining from "./EditTraining";

const HRTraining = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
  });

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [trainingToEdit, setTrainingToEdit] = useState(null);

  // Fetching training programs and assignments
  useEffect(() => {
    fetchTrainingPrograms();
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5002/api/training/assignments",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssignments(response.data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
    }
  };

  const fetchTrainingPrograms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5002/api/training/programs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrainingPrograms(response.data);
    } catch (err) {
      console.error("Error fetching training programs:", err);
    }
  };

  const handleEditClick = (program) => {
    setEditingProgram(program._id);
    setFormData({
      name: program.name,
      description: program.description,
      duration: program.duration,
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/training/programs/${editingProgram}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTrainingPrograms(); // Refresh training program list
      setShowEditModal(false);
      setEditingProgram(null);
    } catch (err) {
      console.error("Error updating training program:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5002/api/training/assign/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>Manage Trainings</h2>

        <button
          className="btn btn-success mb-3"
          onClick={() => setShowAssignModal(true)}
        >
          Assign New Training
        </button>

        {/* Training Programs List */}
        <ul>
          {trainingPrograms.map((program) => (
            <li key={program._id}>
              <h3>{program.name}</h3>
              <p>{program.description}</p>
              <p>{program.duration}</p>
              <button onClick={() => handleEditClick(program)}>Edit</button>
            </li>
          ))}
        </ul>

        {/* Detailed Table for Assigned Trainings */}
        <h3>Assigned Trainings</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Program Name</th>
              <th>Employee</th>
              <th>Session Dates & Times</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment._id}>
                <td>{assignment.training.name}</td>
                <td>{assignment.employee.name}</td>
                <td>
                  {assignment.sessions.map((session, index) => (
                    <div key={index}>
                      <strong>Date:</strong> {session.date}
                      <br />
                      <strong>Start:</strong> {session.startTime} -{" "}
                      <strong>End:</strong> {session.endTime}
                      <hr />
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setTrainingToEdit(assignment);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAssignModal && (
          <AssignTraining
            onClose={() => setShowAssignModal(false)}
            onSave={fetchAssignments}
          />
        )}
        {showEditModal && (
          <EditTraining
            assignmentToEdit={trainingToEdit}
            formData={formData}
            onChange={handleChange}
            onSave={handleSave}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HRTraining;
