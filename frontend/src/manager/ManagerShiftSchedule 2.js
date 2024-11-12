import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";
import "./Manager.css";

const ManagerShiftSchedule = () => {
  const [shifts, setShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    employeeId: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch current shifts
    const fetchShifts = async () => {
      try {
        const res = await axios.get("/api/shifts");
        setShifts(res.data);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShifts();
  }, []);

  const handleApprove = async (shiftId) => {
    try {
      await axios.put(`/api/shifts/${shiftId}/approve`);
      setShifts((prevShifts) =>
        prevShifts.map((shift) =>
          shift._id === shiftId ? { ...shift, status: "Approved" } : shift
        )
      );
    } catch (error) {
      console.error("Error approving shift:", error);
    }
  };

  const handleDeny = async (shiftId) => {
    try {
      await axios.put(`/api/shifts/${shiftId}/deny`);
      setShifts((prevShifts) =>
        prevShifts.map((shift) =>
          shift._id === shiftId ? { ...shift, status: "Denied" } : shift
        )
      );
    } catch (error) {
      console.error("Error denying shift:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShift((prevShift) => ({
      ...prevShift,
      [name]: value,
    }));
  };

  const handleAddShift = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/shifts", newShift);
      setShifts([...shifts, res.data]);
      setNewShift({ employeeId: "", date: "", startTime: "", endTime: "" });
    } catch (error) {
      console.error("Error adding shift:", error);
    }
  };

  return (
    <div className="app-container">
      <ManagerSidebar /> {/* Include the sidebar */}
      <div className="main-content">
        <h2>Shift Scheduling and Approval</h2>

        {isLoading ? (
          <p>Loading shifts...</p>
        ) : (
          <div className="shift-list">
            {shifts.map((shift) => (
              <div key={shift._id} className="shift-item">
                <p>
                  <strong>Employee ID:</strong> {shift.employeeId}
                </p>
                <p>
                  <strong>Date:</strong> {shift.date}
                </p>
                <p>
                  <strong>Time:</strong> {shift.startTime} - {shift.endTime}
                </p>
                <p>
                  <strong>Status:</strong> {shift.status}
                </p>
                {shift.status === "Pending" && (
                  <div className="shift-actions">
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(shift._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="deny-btn"
                      onClick={() => handleDeny(shift._id)}
                    >
                      Deny
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <h3>Add New Shift</h3>
        <form className="add-shift-form" onSubmit={handleAddShift}>
          <label>
            Employee ID:
            <input
              type="text"
              name="employeeId"
              value={newShift.employeeId}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={newShift.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={newShift.startTime}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={newShift.endTime}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit" className="add-shift-btn">
            Add Shift
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerShiftSchedule;
