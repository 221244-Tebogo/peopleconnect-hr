//frontend/employee/EmployeeLeave
import React, { useState } from "react";
import axios from "axios";

const EmployeeLeave = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: "Annual",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(leaveData).forEach((key) =>
      formData.append(key, leaveData[key])
    );
    if (file) formData.append("document", file);

    try {
      await axios.post("http://localhost:5002/api/leave/apply", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Leave application submitted successfully");
    } catch (error) {
      console.error("Error applying for leave:", error);
    }
  };

  return (
    <div>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="leaveType"
          value={leaveData.leaveType}
          onChange={handleChange}
          required
        >
          <option value="Annual">Annual Leave</option>
          <option value="Sick">Sick Leave</option>
          <option value="Maternity">Maternity Leave</option>
          <option value="Unpaid">Unpaid Leave</option>
        </select>
        <input type="date" name="startDate" onChange={handleChange} required />
        <input type="date" name="endDate" onChange={handleChange} required />
        {leaveData.leaveType !== "Annual" && (
          <>
            <input
              type="text"
              name="reason"
              placeholder="Reason for leave"
              onChange={handleChange}
              required
            />
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg"
            />
          </>
        )}
        <button type="submit">Submit Leave</button>
      </form>
    </div>
  );
};

export default EmployeeLeave;
