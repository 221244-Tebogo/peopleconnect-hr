import React, { useEffect, useState } from "react";
import HRSidebar from "../components/sidebar/HRSidebar";

const HRLeave = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    const fakeLeaveApplications = [
      {
        _id: "1",
        employeeId: "Katlego Tshabalala",
        leaveType: "Sick Leave",
        startDate: "2024-11-10",
        endDate: "2024-11-12",
        status: "Approved",
      },
      {
        _id: "2",
        employeeId: "Jane Smith",
        leaveType: "Maternity Leave",
        startDate: "2024-11-01",
        endDate: "2025-01-30",
        status: "Waiting for Approval",
      },
      {
        _id: "3",
        employeeId: "Alice Johnson",
        leaveType: "Annual Leave",
        startDate: "2024-12-15",
        endDate: "2024-12-25",
        status: "Approved",
      },
      {
        _id: "4",
        employeeId: "Bob Lee",
        leaveType: "Sick Leave",
        startDate: "2024-11-05",
        endDate: "2024-11-06",
        status: "Waiting for Approval",
      },
      {
        _id: "5",
        employeeId: "Sarah Brown",
        leaveType: "Maternity Leave",
        startDate: "2024-10-01",
        endDate: "2025-02-01",
        status: "Approved",
      },
    ];

    setLeaveApplications(fakeLeaveApplications);
  }, []);

  return (
    <div className="app-container">
      <HRSidebar />
      <div className="main-content">
        <h2>All Leave Applications</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover mt-3">
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
      </div>
    </div>
  );
};

export default HRLeave;
