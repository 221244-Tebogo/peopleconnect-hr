import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";
import HRSidebar from "../components/sidebar/HRSidebar";

const ManagerProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5002/api/profile",
        { address: user.address, phone: user.phone },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const renderSidebar = () => {
    switch (user.role) {
      case "hr":
        return <HRSidebar />;
      case "manager":
        return <ManagerSidebar />;
      case "employee":
        return <EmployeeSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {renderSidebar()}
      <div className="main-content">
        <h1>Profile</h1>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Position:</strong>{" "}
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>{" "}
        {/* Displaying the role as position */}
        {isEditing ? (
          <>
            <div>
              <label>
                Address:
                <input
                  type="text"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Phone:
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </label>
            </div>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManagerProfile;
