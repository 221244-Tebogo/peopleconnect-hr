// src/hr/JobCreationModal.js
import React, { useState } from "react";
import axios from "axios";

const JobCreationModal = ({ fetchPositions, closeModal, editPosition }) => {
  const [newPosition, setNewPosition] = useState(
    editPosition || {
      title: "",
      department: "",
      description: "",
      duration: "",
      applicationDeadline: "",
    }
  );
  const [file, setFile] = useState(null);

  const departments = [
    "Marketing",
    "IT",
    "Finance",
    "Security",
    "Human Resources",
    "Food & Beverage",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPosition((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPosition.title);
    formData.append("department", newPosition.department);
    formData.append("description", newPosition.description);
    formData.append("applicationDeadline", newPosition.applicationDeadline);
    formData.append("duration", newPosition.duration);
    if (file) formData.append("file", file);

    try {
      const url = editPosition
        ? `http://localhost:5002/api/careers/${editPosition._id}`
        : "http://localhost:5002/api/careers";
      const method = editPosition ? "put" : "post";

      await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchPositions(); // Refresh job list after creation
      closeModal(); // Close modal
    } catch (error) {
      console.error("Error creating/updating position:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{editPosition ? "Edit Position" : "Add New Position"}</h2>
        <form onSubmit={handleCreateOrUpdate}>
          <input
            type="text"
            name="title"
            value={newPosition.title}
            onChange={handleChange}
            required
            placeholder="Title"
          />
          <select
            name="department"
            value={newPosition.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <textarea
            name="description"
            value={newPosition.description}
            onChange={handleChange}
            required
            placeholder="Description"
          ></textarea>
          <input
            type="number"
            name="duration"
            value={newPosition.duration}
            onChange={handleChange}
            required
            placeholder="Duration (days)"
            min="1"
          />
          <input
            type="date"
            name="applicationDeadline"
            value={newPosition.applicationDeadline}
            onChange={handleChange}
            required
          />
          <input type="file" onChange={handleFileChange} accept=".pdf" />
          <button type="submit" className="btn btn-success">
            {editPosition ? "Update Position" : "Create Position"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobCreationModal;
