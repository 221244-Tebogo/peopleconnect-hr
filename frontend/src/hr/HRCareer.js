// src/hr/HrCareer.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import "./AdminDashboard.css";

const HrCareer = () => {
  const [positions, setPositions] = useState([]);
  const [newPosition, setNewPosition] = useState({
    title: "",
    department: "",
    description: "",
    duration: "",
  });
  const [editPosition, setEditPosition] = useState(null);
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const departments = [
    "Marketing",
    "IT",
    "Finance",
    "Security",
    "Human Resources",
    "Food & Beverage",
  ];

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("/api/hr/careers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPosition((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPosition.title);
    formData.append("department", newPosition.department);
    formData.append("description", newPosition.description);
    formData.append("duration", newPosition.duration);
    if (file) formData.append("file", file);

    try {
      const url = editPosition
        ? `/api/careers/${editPosition._id}`
        : "/api/careers";
      const method = editPosition ? "put" : "post";
      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (editPosition) {
        setPositions(
          positions.map((pos) =>
            pos._id === response.data._id ? response.data : pos
          )
        );
        alert("Position updated successfully!");
      } else {
        setPositions([...positions, response.data]);
        alert("Position created successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error creating/updating position:", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  const resetForm = () => {
    setNewPosition({
      title: "",
      department: "",
      description: "",
      duration: "",
    });
    setFile(null);
    setEditPosition(null);
    setShowModal(false);
  };

  const handleEdit = (position) => {
    setEditPosition(position);
    setNewPosition(position);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/careers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPositions(positions.filter((position) => position._id !== id));
      alert("Position deleted successfully!");
    } catch (error) {
      console.error("Error deleting position:", error);
      alert("Unable to delete the position. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Career Opportunities</b>
                </h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-end gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                >
                  <i className="fa fa-plus"></i>
                  <span>Add New Position</span>
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{editPosition ? "Edit Position" : "Add New Position"}</h2>
                <form onSubmit={handleCreateOrUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newPosition.title}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <select
                      name="department"
                      value={newPosition.department}
                      onChange={handleChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      value={newPosition.description}
                      onChange={handleChange}
                      required
                      className="form-control"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Posting Duration (in days)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={newPosition.duration}
                      onChange={handleChange}
                      required
                      className="form-control"
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Upload Job Description (PDF)
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-success me-2">
                    {editPosition ? "Update Position" : "Create Position"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Description</th>
                <th>Duration (Days)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => (
                <tr key={position._id}>
                  <td>{position.title}</td>
                  <td>{position.department}</td>
                  <td>{position.description}</td>
                  <td>{position.duration || "N/A"}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(position)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="fa fa-pencil"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(position._id)}
                      className="btn btn-danger btn-sm"
                    >
                      <i className="fa fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HrCareer;
