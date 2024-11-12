// backend/routes/training.js
const express = require("express");
const TrainingAssignment = require("../models/TrainingAssignment");
const Training = require("../models/Training");
const auth = require("../middleware/auth");

const router = express.Router();

// Fetch all training programs
router.get("/programs", auth, async (req, res) => {
  try {
    const programs = await Training.find();
    res.status(200).json(programs);
  } catch (err) {
    console.error("Error fetching programs:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Assign training to an employee
router.post("/assign", auth, async (req, res) => {
  const { employee, trainingTask, sessions } = req.body;

  try {
    const training = await Training.findOne({ name: trainingTask });
    if (!training)
      return res.status(404).json({ message: "Training not found" });

    const assignment = new TrainingAssignment({
      employee,
      training: training._id,
      sessions,
    });
    await assignment.save();

    res
      .status(201)
      .json({ message: "Training assigned successfully", assignment });
  } catch (err) {
    console.error("Error assigning training:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all assignments
router.get("/assignments", auth, async (req, res) => {
  try {
    const assignments = await TrainingAssignment.find()
      .populate("employee", "name surname email")
      .populate("training", "name description duration");
    res.status(200).json(assignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update training assignment
router.put("/assign/:id", auth, async (req, res) => {
  const { employee, training, sessions } = req.body;
  try {
    const assignment = await TrainingAssignment.findByIdAndUpdate(
      req.params.id,
      { employee, training, sessions },
      { new: true }
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error updating assignment" });
  }
});

// Delete training assignment
router.delete("/assign/:id", auth, async (req, res) => {
  try {
    const assignment = await TrainingAssignment.findByIdAndDelete(
      req.params.id
    );
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting assignment" });
  }
});

// Update training program details
router.put("/programs/:id", auth, async (req, res) => {
  const { name, description, duration } = req.body;

  try {
    const updatedProgram = await Training.findByIdAndUpdate(
      req.params.id,
      { name, description, duration },
      { new: true }
    );

    if (!updatedProgram) {
      return res.status(404).json({ message: "Training program not found" });
    }
    res.status(200).json(updatedProgram);
  } catch (err) {
    console.error("Error updating program:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
