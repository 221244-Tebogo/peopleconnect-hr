import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";

const EmployeeLeave = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: "Annual",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      await axios.post("http://localhost:5002/api/leaves/apply", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Leave application submitted successfully");
    } catch (error) {
      console.error("Error applying for leave:", error);
    }
    setLoading(false);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h2>Apply for Leave</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="leaveType">
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

          <Form.Group controlId="startDate" className="mt-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="endDate" className="mt-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              onChange={handleChange}
              required
            />
          </Form.Group>

          {leaveData.leaveType !== "Annual" && (
            <>
              <Form.Group controlId="reason" className="mt-3">
                <Form.Label>Reason for Leave</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  placeholder="Reason for leave"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="document" className="mt-3">
                <Form.Label>Upload Supporting Document</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg"
                />
              </Form.Group>
            </>
          )}

          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Submit Leave"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EmployeeLeave;
