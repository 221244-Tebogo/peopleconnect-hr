// src/employee/EmployeeTaskManagement.jsssuming employeeId is stored in localStorage

import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeSidebar from "../components/sidebar/EmployeeSidebar";

const EmployeeTaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const employeeId = localStorage.getItem("employeeId");
      const response = await axios.get(
        `http://localhost:5002/api/tasks/assigned/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks(response.data);

      setLikeCounts(
        response.data.reduce((acc, task) => {
          acc[task._id] = task.likes || 0;
          return acc;
        }, {})
      );
      setComments(
        response.data.reduce((acc, task) => {
          acc[task._id] = task.comments || [];
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLike = async (taskId) => {
    try {
      await axios.put(
        `http://localhost:5002/api/tasks/${taskId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLikeCounts((prev) => ({ ...prev, [taskId]: prev[taskId] + 1 }));
    } catch (error) {
      console.error("Error liking task:", error);
    }
  };

  const handleComment = async (taskId, comment) => {
    try {
      await axios.post(
        `http://localhost:5002/api/tasks/${taskId}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments((prev) => ({
        ...prev,
        [taskId]: [...prev[taskId], comment],
      }));
    } catch (error) {
      console.error("Error commenting on task:", error);
    }
  };

  const markComplete = async (taskId) => {
    try {
      await axios.patch(
        `http://localhost:5002/api/tasks/complete/${taskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  return (
    <div className="app-container">
      <EmployeeSidebar />
      <div className="main-content">
        <h2>Employee Tasks</h2>

        {/* Displaying Tasks */}
        <div>
          {tasks.map((task) => (
            <div key={task._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{task.text}</h5>
                <p className="card-text">
                  <strong>Assigned to:</strong> {task.employeeName}
                </p>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  {task.completed ? "Completed" : "Pending"}
                </p>

                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleLike(task._id)}
                >
                  Like ({likeCounts[task._id]})
                </button>

                {!task.completed && (
                  <button
                    className="btn btn-success btn-sm ms-2"
                    onClick={() => markComplete(task._id)}
                  >
                    Mark Complete
                  </button>
                )}

                <div className="mt-3">
                  <h6>Comments</h6>
                  {comments[task._id]?.map((comment, idx) => (
                    <p key={idx} className="card-text">
                      {comment}
                    </p>
                  ))}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add a comment"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleComment(task._id, e.target.value);
                        e.target.value = "";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeTaskManagement;
