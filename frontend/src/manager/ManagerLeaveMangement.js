import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagerLeaveManagement = () => {
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [leaveHistory, setLeaveHistory] = useState([]);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const [balanceResponse, historyResponse] = await Promise.all([
        axios.get("http://localhost:5002/api/leaves/balance", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
        axios.get("http://localhost:5002/api/leaves/history", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }),
      ]);

      setLeaveBalance(balanceResponse.data.leaveBalance);
      setLeaveHistory(historyResponse.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  return (
    <div>
      <h2>Leave Management</h2>
      <div>
        <h3>Leave Balance</h3>
        <p>{leaveBalance ? leaveBalance : "Loading..."}</p>
      </div>
      <div>
        <h3>Leave History</h3>
        <ul>
          {leaveHistory.map((leave) => (
            <li key={leave._id}>
              {leave.leaveType} from {leave.startDate} to {leave.endDate} -{" "}
              {leave.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MangerLeaveManagement;
