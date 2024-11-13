// EMPLOYEES/LeaveManagement.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";

const LeaveManagement = () => {
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
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2 className="mb-3">Leave Management</h2>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Leave Balance</Card.Title>
              <Card.Text>
                {leaveBalance !== null ? (
                  leaveBalance
                ) : (
                  <Spinner animation="border" variant="primary" />
                )}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Leave History</Card.Title>
              <ListGroup variant="flush">
                {leaveHistory.length > 0 ? (
                  leaveHistory.map((leave) => (
                    <ListGroup.Item key={leave._id}>
                      {leave.leaveType} from {leave.startDate} to{" "}
                      {leave.endDate} - <strong>{leave.status}</strong>
                    </ListGroup.Item>
                  ))
                ) : (
                  <p>No leave history available.</p>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar for upcoming events */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Pending Leave Approvals</ListGroup.Item>
                <ListGroup.Item>HR Training Sessions</ListGroup.Item>
                <ListGroup.Item>Manager Meeting</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LeaveManagement;
