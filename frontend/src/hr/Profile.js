// src/pages/HRProfile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const HRProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [callMessage, setCallMessage] = useState("");

  // Fetch HR profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5002/api/hr/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data);
      setFormData(response.data); // Initialize form data for editing
      displayCallMessage(response.data.name, response.data.role);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  // Function to display the "Call" message
  const displayCallMessage = (name, role) => {
    const message = `Call: ${name} - ${role}`;
    console.log("Setting callMessage:", message); // Debugging line
    setCallMessage(message);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put("http://localhost:5002/api/hr/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      fetchProfile(); // Refresh profile data
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="container">
        <h2>HR Profile</h2>

        {/* Display the Call Message */}
        {callMessage ? (
          <div className="alert alert-info">{callMessage}</div>
        ) : (
          <p>Loading profile message...</p>
        )}

        {!isEditing ? (
          <div className="profile-view">
            <p>
              <strong>Name:</strong> {profileData.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {profileData.email || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {profileData.role || "N/A"}
            </p>
            <p>
              <strong>Department:</strong> {profileData.department || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {profileData.phone || "N/A"}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="profile-edit">
            <form>
              <div className="form-group mb-2">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label>Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRProfile;
