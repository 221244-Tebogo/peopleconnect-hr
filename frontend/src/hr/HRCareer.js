// src/hr/HrCareer.js
import React, { useState, useEffect } from "react";
import HRSidebar from "../components/sidebar/HRSidebar";
import JobCreationModal from "./JobCreationModal";
import PostedCareers from "./PostedCareers";
import axios from "axios";

const HrCareer = () => {
  const [positions, setPositions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editPosition, setEditPosition] = useState(null);

  const fetchPositions = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/careers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const openModal = (position = null) => {
    setEditPosition(position);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditPosition(null);
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>Manage Career Opportunities</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={() => openModal()}>
            Add New Position
          </button>
        </div>
        <PostedCareers
          positions={positions}
          fetchPositions={fetchPositions}
          openModal={openModal}
          setEditPosition={setEditPosition}
        />
        {showModal && (
          <JobCreationModal
            fetchPositions={fetchPositions}
            closeModal={closeModal}
            editPosition={editPosition}
          />
        )}
      </div>
    </div>
  );
};

export default HrCareer;
