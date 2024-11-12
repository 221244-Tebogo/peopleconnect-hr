import React, { useEffect, useState } from "react";
import axios from "axios";

const HRLeave = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/leave/view",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLeaveApplications(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
      }
    };
    fetchLeaveApplications();
  }, []);

  return (
    <div>
      <h2>All Leave Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveApplications.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employeeId}</td>
              <td>{leave.leaveType}</td>
              <td>{leave.startDate}</td>
              <td>{leave.endDate}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRLeave;
