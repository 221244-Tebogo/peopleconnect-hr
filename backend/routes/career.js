const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const JobPosting = require("../models/JobPosting");

const router = express.Router();

// Multer setup for handling form data (no file uploads)
const upload = multer();

// Route to get all job postings
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await JobPosting.find();
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job postings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to create a new job posting
router.post("/", auth, upload.none(), async (req, res) => {
  const {
    title,
    description,
    department,
    location,
    salaryRange,
    applicationDeadline,
  } = req.body;

  try {
    if (req.user.role !== "hr" && req.user.role !== "admin") {
      return res.status(401).json({ message: "User not authorized" });
    }

    const newJob = new JobPosting({
      title,
      description,
      department,
      location,
      salaryRange,
      applicationDeadline,
      postedBy: req.user.id,
    });

    const job = await newJob.save();
    res.json(job);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: "Server error - Unable to save job posting",
      errorDetails: error.message,
    });
  }
});

// Route to update an existing job posting
router.put("/:id", auth, upload.none(), async (req, res) => {
  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error during update" });
  }
});

// Route to delete a job posting
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedJob = await JobPosting.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Server error during delete" });
  }
});

module.exports = router;
