// backend/routes/training.js
const express = require("express");
const TrainingAssignment = require("../models/TrainingAssignment");
const Training = require("../models/Training");
const auth = require("../middleware/auth");
const router = express.Router();

// Get training programs
router.get("/programs", async (req, res) => {
  try {
    const programs = await Training.find();
    res.status(200).json(programs);
  } catch (err) {
    console.error("Error fetching training programs:", err);
    res.status(500).json({
      message: "Error fetching training programs",
      error: err.message,
    });
  }
});

// Assign training to an employee
router.post("/assign", auth, async (req, res) => {
  const { employee, trainingTask, sessions } = req.body;

  try {
    const training = await Training.findOne({ name: trainingTask });
    if (!training) {
      return res.status(404).json({ message: "Training program not found" });
    }

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
    res
      .status(500)
      .json({ message: "Error assigning training", error: err.message });
  }
});

// Fetch all training assignments with employee and training program details
router.get("/assignments", auth, async (req, res) => {
  try {
    const assignments = await TrainingAssignment.find()
      .populate("employee", "name surname email")
      .populate("training", "name description duration");

    res.status(200).json(assignments);
  } catch (err) {
    console.error("Error fetching training assignments:", err);
    res.status(500).json({ message: "Error fetching training assignments" });
  }
});

module.exports = router;
