import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Card,
  Spinner,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import "./Dashboard.css";

const EmployeeLeave = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: "Annual",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [leaveBalance, setLeaveBalance] = useState({
    annualLeaveBalance: 0,
    sickLeaveBalance: 0,
  });
  const [leaveHistory, setLeaveHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const calculateNumberOfDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    if (leaveData.startDate && leaveData.endDate) {
      setNumberOfDays(
        calculateNumberOfDays(leaveData.startDate, leaveData.endDate)
      );
    }
  }, [leaveData.startDate, leaveData.endDate]);

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
        annualLeaveBalance: balanceResponse.data.annualLeaveBalance,
        sickLeaveBalance: balanceResponse.data.sickLeaveBalance,
      });
      setLeaveHistory(historyResponse.data);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(leaveData).forEach((key) =>
      formData.append(key, leaveData[key])
    );
    formData.append("numberOfDays", numberOfDays);
    if (file) formData.append("document", file);

    setLoading(true);
    try {
      await axios.post("http://localhost:5002/api/leaves/apply", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Leave application submitted successfully");
      await fetchLeaveData();
    } catch (error) {
      console.error("Error applying for leave:", error);
    }
    setLoading(false);
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar-left">
          <EmployeeSidebar />
        </Col>

        {/* Main Content */}
        <Col md={6} className="main-content">
          <h2>Leave Management Dashboard</h2>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Apply for Leave</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="leaveType" className="mb-3">
                  <Form.Label>Leave Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="leaveType"
                    value={leaveData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Annual">Annual Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Maternity">Maternity Leave</option>
                    <option value="Unpaid">Unpaid Leave</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="startDate" className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="endDate" className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <p>
                  <strong>Days of Leave:</strong> {numberOfDays} days
                </p>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Submit Leave"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Leave Balance</Card.Title>
              <p>
                <strong>Annual Leave:</strong> {leaveBalance.annualLeaveBalance}{" "}
                days
              </p>
              <p>
                <strong>Sick Leave:</strong> {leaveBalance.sickLeaveBalance}{" "}
                days
              </p>
            </Card.Body>
          </Card>

          <Card className="leave-history mb-4">
            <Card.Body>
              <Card.Title>Leave History</Card.Title>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.length > 0 ? (
                    leaveHistory.map((leave) => (
                      <tr key={leave._id}>
                        <td>{leave.leaveType}</td>
                        <td>
                          {new Date(leave.startDate).toLocaleDateString()}
                        </td>
                        <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td>{leave.numberOfDays} days</td>
                        <td>{leave.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No leave history available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Sidebar */}
        <Col md={3} className="sidebar-right">
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Events</Card.Title>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Pending Leave Approvals</li>
                <li className="list-group-item">HR Training Sessions</li>
                <li className="list-group-item">Manager Meeting</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeLeave;
