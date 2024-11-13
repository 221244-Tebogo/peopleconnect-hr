import React, { useEffect, useState } from "react";
import axios from "axios";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";
import { Container, Table, Button, Card } from "react-bootstrap";

const ManagerLeave = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5002/api/leaves/view",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLeaveApplications(response.data);
    } catch (error) {
      console.error("Error fetching leave applications:", error);
    }
  };

  const handleReview = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5002/api/leaves/review/${id}`,
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
    <Container className="mt-4">
      <Card className="p-4">
        <ManagerSidebar />

        <h2>Manage Leave Applications</h2>
        <Table striped bordered hover className="mt-3">
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
                    <a
                      href={leave.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{leave.status}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleReview(leave._id, "Approved")}
                    className="me-2"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReview(leave._id, "Declined")}
                  >
                    Decline
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default ManagerLeave;
