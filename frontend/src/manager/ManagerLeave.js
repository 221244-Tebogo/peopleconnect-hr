import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerLeave = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/leave/view", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setLeaveApplications(response.data);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    }
  };

  const handleReview = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5002/api/leave/review/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchLeaveApplications();
    } catch (error) {
      console.error("Error reviewing leave:", error);
    }
  };

  return (
    <div>
      <h2>Manage Leave Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Document</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveApplications.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employeeId}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>
                {leave.documentUrl ? (
                  <a href={leave.documentUrl}>View</a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{leave.status}</td>
              <td>
                <button onClick={() => handleReview(leave._id, "Approved")}>
                  Approve
                </button>
                <button onClick={() => handleReview(leave._id, "Declined")}>
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerLeave;
