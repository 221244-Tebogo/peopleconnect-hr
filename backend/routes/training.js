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
router.put("/programs/:id", auth, async (req, res) => {
  const { name, description, duration, date, instructor } = req.body;
  try {
    const updatedProgram = await Training.findByIdAndUpdate(
      req.params.id,
      { name, description, duration, date, instructor },
      { new: true }
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

// Route to delete a training program
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

module.exports = router;
