// backend/routes/task.js
const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// Create a new task
router.post("/create", auth, async (req, res) => {
  const { text, employee } = req.body;
  try {
    const task = new Task({ text, employee, createdBy: req.user._id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create task", error: error.message });
  }
});

// Get tasks assigned to a specific employee
router.get("/assigned/:employeeId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ employee: req.params.employeeId });
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
});

// Toggle task completion
router.patch("/complete/:taskId", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
});

// Add comment to a task
router.patch("/comment/:taskId", auth, async (req, res) => {
  const { comment } = req.body;
  try {
    const task = await Task.findById(req.params.taskId);
    task.comments.push(comment);
    await task.save();
    res.json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: error.message });
  }
});

module.exports = router;
