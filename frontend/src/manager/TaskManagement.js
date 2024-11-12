import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import Modal from "../components/Modal";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks and employees on component mount
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const addTask = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5002/api/tasks/create",
        { text: newTask, employee: assignedEmployee },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks([...tasks, response.data]);
      setNewTask("");
      setAssignedEmployee("");
      setShowModal(false);
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5002/api/tasks/complete/${taskId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error toggling task completion:", error.message);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5002/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const addComment = async (taskId, comment) => {
    try {
      const response = await axios.patch(
        `http://localhost:5002/api/tasks/comment/${taskId}`,
        { comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h1>Task Management</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Add New Task
        </button>

        {/* Task Creation Modal */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <h2>Create New Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Task Description"
              className="form-control mb-2"
            />
            <select
              value={assignedEmployee}
              onChange={(e) => setAssignedEmployee(e.target.value)}
              className="form-control mb-2"
            >
              <option value="">Assign to Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
            <button onClick={addTask} className="btn btn-success">
              Save Task
            </button>
          </Modal>
        )}

        {/* Display Task List */}
        <ul className="task-list mt-4">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleComplete={() => toggleComplete(task._id)}
              onDelete={() => deleteTask(task._id)}
              onAddComment={(comment) => addComment(task._id, comment)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskManagement;
