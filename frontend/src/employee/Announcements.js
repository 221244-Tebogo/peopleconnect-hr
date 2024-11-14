import React, { useState, useEffect } from "react";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const EmployeeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5002/api/announcements"
      );
      setAnnouncements(response.data);
      setLikeCounts(
        response.data.reduce((acc, post) => {
          acc[post._id] = post.likes || 0;
          return acc;
        }, {})
      );
      setComments(
        response.data.reduce((acc, post) => {
          acc[post._id] = post.comments || [];
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5002/api/announcements/${id}/like`);
      setLikeCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    } catch (error) {
      console.error("Error liking announcement:", error);
    }
  };

  const handleComment = async (id, comment) => {
    try {
      await axios.post(
        `http://localhost:5002/api/announcements/${id}/comment`,
        { comment }
      );
      setComments((prev) => ({
        ...prev,
        [id]: [...prev[id], comment],
      }));
    } catch (error) {
      console.error("Error commenting on announcement:", error);
    }
  };

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h2>Employee Announcements</h2>
        <Container>
          <Row>
            {announcements.map((announcement) => (
              <Col md={4} className="mb-4" key={announcement._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>{announcement.title}</Card.Title>
                    <Card.Text>
                      <strong>Type:</strong> {announcement.type}
                    </Card.Text>
                    <Card.Text>{announcement.content}</Card.Text>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleLike(announcement._id)}
                    >
                      Like ({likeCounts[announcement._id]})
                    </Button>
                    <div className="mt-3">
                      <h6>Comments</h6>
                      {comments[announcement._id]?.map((comment, idx) => (
                        <p key={idx} className="mb-1">
                          {comment}
                        </p>
                      ))}
                      <Form.Control
                        type="text"
                        placeholder="Add a comment"
                        className="mt-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value) {
                            handleComment(announcement._id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EmployeeAnnouncements;
