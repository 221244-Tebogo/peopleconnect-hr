import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Spinner,
  Button,
  Form,
} from "react-bootstrap";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";

const LeaveManagement = () => {
  const [leaveBalance, setLeaveBalance] = useState({ annual: 0, sick: 0 });
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      setLeaveBalance({
        annual: balanceResponse.data.annualLeaveBalance,
        sick: balanceResponse.data.sickLeaveBalance,
      });
      setLeaveHistory(historyResponse.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:5002/api/leaves/apply",
        { leaveType, startDate, endDate },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Leave application submitted successfully");
      fetchLeaveData();
      setLeaveType("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Error applying for leave:", error);
      alert("Failed to submit leave application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <EmployeeSidebar />
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <h2 className="mb-4">Leave Management Dashboard</h2>

          {/* Leave Balance and Application Section */}
          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Leave Balance</Card.Title>
                  <Card.Text>
                    {leaveBalance ? (
                      <>
                        <strong>Annual Leave:</strong> {leaveBalance.annual}{" "}
                        days
                        <br />
                        <strong>Sick Leave:</strong> {leaveBalance.sick} days
                      </>
                    ) : (
                      <Spinner animation="border" variant="primary" />
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Apply for Leave</Card.Title>
                  <Form onSubmit={handleApplyLeave}>
                    <Form.Group className="mb-3">
                      <Form.Label>Leave Type</Form.Label>
                      <Form.Control
                        as="select"
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        required
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Apply Leave"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Leave History */}
          <Card className="mb-4">
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

          {/* Upcoming Events */}
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
