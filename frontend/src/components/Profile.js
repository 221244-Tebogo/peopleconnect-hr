// src/components/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    // Fetch user profile data from an API or localStorage on component mount
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Assume userId is stored after login
        const response = await axios.get(
          `http://localhost:5002/api/users/${userId}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`http://localhost:5002/api/users/${userId}`, {
        address: profile.address,
        phone: profile.phone,
      });
      setUpdateMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setUpdateMessage("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>Welcome, {profile.name}!</h1>
      <p>This is your profile page.</p>
      {updateMessage && <p>{updateMessage}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={profile.name}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" disabled={isUpdating} className="btn btn-primary">
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
