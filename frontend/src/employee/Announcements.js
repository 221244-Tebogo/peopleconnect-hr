// src/pages/employees/Announcements.js
import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar"; // Employee Sidebar
import axios from "axios";

const EmployeeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5002/api/announcements"
      );
      setAnnouncements(response.data);
      setLikeCounts(
        response.data.reduce((acc, post) => {
          acc[post._id] = post.likes || 0;
          return acc;
        }, {})
      );
      setComments(
        response.data.reduce((acc, post) => {
          acc[post._id] = post.comments || [];
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5002/api/announcements/${id}/like`);
      setLikeCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    } catch (error) {
      console.error("Error liking announcement:", error);
    }
  };

  const handleComment = async (id, comment) => {
    try {
      await axios.post(
        `http://localhost:5002/api/announcements/${id}/comment`,
        { comment }
      );
      setComments((prev) => ({
        ...prev,
        [id]: [...prev[id], comment],
      }));
    } catch (error) {
      console.error("Error commenting on announcement:", error);
    }
  };

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="container">
        <h2>Employee Announcements</h2>

        {/* Displaying Announcements */}
        <div>
          {announcements.map((announcement) => (
            <div key={announcement._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{announcement.title}</h5>
                <p className="card-text">
                  <strong>Type:</strong> {announcement.type}
                </p>
                <p>{announcement.content}</p>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleLike(announcement._id)}
                >
                  Like ({likeCounts[announcement._id]})
                </button>

                <div className="mt-3">
                  <h6>Comments</h6>
                  {comments[announcement._id]?.map((comment, idx) => (
                    <p key={idx} className="card-text">
                      {comment}
                    </p>
                  ))}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleComment(announcement._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeAnnouncements;
