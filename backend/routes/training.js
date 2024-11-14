const express = require("express");
const TrainingAssignment = require("../models/TrainingAssignment");
const Training = require("../models/Training");
const auth = require("../middleware/auth");

const router = express.Router();

// Route to fetch all training assignments
router.get("/assignments", auth, async (req, res) => {
  try {
    const assignments = await TrainingAssignment.find()
      .populate("employee", "name surname email") // populate employee details
      .populate("training", "name description duration"); // populate training details
    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to assign training to an employee
router.post("/assign", auth, async (req, res) => {
  const { employee, trainingTask, sessions } = req.body;

  try {
    // Find the training program by name or ID
    const training = await Training.findOne({ name: trainingTask });
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }

    // Create a new training assignment
    const assignment = new TrainingAssignment({
      employee,
      training: training._id,
      sessions,
    });
    await assignment.save();

    res
      .status(201)
      .json({ message: "Training assigned successfully", assignment });
  } catch (error) {
    console.error("Error assigning training:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to update a training program
// Fetch all training programs
router.get("/programs", auth, async (req, res) => {
  try {
    const programs = await Training.find();
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching training programs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a training program
router.put("/programs/:id", auth, async (req, res) => {
  try {
    const updatedProgram = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProgram) {
      return res.status(404).json({ message: "Training program not found" });
    }
    res.status(200).json(updatedProgram);
  } catch (error) {
    console.error("Error updating training program:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a training program
router.delete("/programs/:id", auth, async (req, res) => {
  try {
    const deletedProgram = await Training.findByIdAndDelete(req.params.id);
    if (!deletedProgram) {
      return res.status(404).json({ message: "Training program not found" });
    }
    res.status(200).json({ message: "Training program deleted" });
  } catch (error) {
    console.error("Error deleting training program:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all training programs
router.get("/programs", auth, async (req, res) => {
  try {
    const programs = await Training.find();
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching training programs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to update a training assignment
// Backend route for updating training assignment
router.put("/assign/:id", auth, async (req, res) => {
  const { sessions } = req.body;

  // Additional validation
  if (
    !sessions ||
    sessions.some((session) => !session.startTime || !session.endTime)
  ) {
    return res
      .status(400)
      .json({ message: "Each session must include start and end times." });
  }

  try {
    const updatedAssignment = await TrainingAssignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    res.json(updatedAssignment);
  } catch (error) {
    console.error("Error updating assignment:", error);
    res.status(500).json({ message: "Server error during assignment update" });
  }
});

module.exports = router;
