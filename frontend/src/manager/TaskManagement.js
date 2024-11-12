// src/manager/TaskManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");

  useEffect(() => {
    axios.get("/api/tasks").then((response) => setTasks(response.data));
  }, []);

  const addTask = async () => {
    if (newTask && assignedEmployee) {
      const response = await axios.post("/api/tasks/create", {
        text: newTask,
        employee: assignedEmployee,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
      setAssignedEmployee("");
    }
  };

  const toggleComplete = async (taskId) => {
    const response = await axios.patch(`/api/tasks/complete/${taskId}`);
    setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const addComment = async (taskId, comment) => {
    const response = await axios.patch(`/api/tasks/comment/${taskId}`, {
      comment,
    });
    setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
  };

  return (
    <div>
      <h1>Task Assignment</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
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
  );
}

export default TaskManagement;
