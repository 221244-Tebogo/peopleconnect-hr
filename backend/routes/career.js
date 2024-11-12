// src/backend/routes/career.js
const express = require("express");
const auth = require("../middleware/auth"); // Import the auth middleware
const JobPosting = require("../models/JobPosting");

const router = express.Router();

// Create a job posting (HR/Admin only)
router.post("/", auth, async (req, res) => {
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
      return res.status(401).json({ msg: "User not authorized" });
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
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
});

// Get all job postings (no auth required if anyone can view)
router.get("/", async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ postDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
