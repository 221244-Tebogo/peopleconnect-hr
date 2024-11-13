// routes/careers.js
const express = require("express");
const auth = require("../middleware/auth");
const JobPosting = require("../models/JobPosting");

const router = express.Router();

// Route to get all job postings
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await JobPosting.find(); // Fetch all jobs from the database
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job postings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to create a new job posting (already defined)
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
    console.error("Server Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
