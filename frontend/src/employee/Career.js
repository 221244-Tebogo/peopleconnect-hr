import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Career = () => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/careers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPositions(response.data);
      } catch (error) {
        console.error("Error fetching career positions:", error);
      }
    };
    fetchPositions();
  }, []);

  const handleApply = (position) => {
    setSelectedPosition(position);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", applicationData.name);
    formData.append("email", applicationData.email);
    formData.append("resume", applicationData.resume);
    formData.append("position", selectedPosition._id);

    try {
      await axios.post("http://localhost:5002/api/apply", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h2>Career Opportunities</h2>
        <Container>
          <Row>
            {positions.map((position) => (
              <Col md={4} className="mb-4" key={position._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{position.title}</Card.Title>
                    <Card.Text>{position.description}</Card.Text>
                    <Card.Text>
                      <strong>Department:</strong> {position.department}
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleApply(position)}
                    >
                      Apply
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {selectedPosition && (
          <div className="application-form">
            <h2>Apply for {selectedPosition.title}</h2>
            <Form onSubmit={handleSubmitApplication}>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Resume:</Form.Label>
                <Form.Control
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit Application
              </Button>
            </Form>
            {message && <p className="message mt-3">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Career;
