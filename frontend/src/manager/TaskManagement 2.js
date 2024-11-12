import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";

function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]); // Store employee list
  const [newTask, setNewTask] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState("");

  // Fetch tasks and employees when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all tasks
        const tasksResponse = await axios.get(
          "http://localhost:5001/api/tasks"
        );
        setTasks(tasksResponse.data);

        // Fetch all employees
        const employeesResponse = await axios.get(
          "http://localhost:5001/api/users/employees"
        );
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Function to add a new task
  const addTask = async () => {
    if (newTask && assignedEmployee) {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/tasks/create",
          {
            text: newTask,
            employee: assignedEmployee,
          }
        );
        setTasks([...tasks, response.data.task]);
        setNewTask("");
        setAssignedEmployee("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  // Toggle task completion
  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/tasks/complete/${taskId}`
      );
      setTasks(
        tasks.map((task) => (task._id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
      <select
        value={assignedEmployee}
        onChange={(e) => setAssignedEmployee(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((employee) => (
          <option key={employee._id} value={employee._id}>
            {employee.name} {employee.surname}
          </option>
        ))}
      </select>
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleComplete={() => toggleComplete(task._id)}
              onDelete={() => deleteTask(task._id)}
            />
          ))
        ) : (
          <p>No tasks assigned</p>
        )}
      </ul>
    </div>
  );
}

export default TaskManagement;
