// backend/routes/career.js
const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");
const JobPosting = require("../models/JobPosting");

const router = express.Router();
const upload = multer({ dest: "public/jobs/" }); // Define where files should be stored

// Route to handle job posting with PDF upload
router.post("/", auth, upload.single("file"), async (req, res) => {
  const {
    title,
    description,
    department,
    location,
    salaryRange,
    applicationDeadline,
  } = req.body;
  const pdfUrl = req.file ? `/jobs/${req.file.filename}` : null; // Ensure `req.file` is handled correctly

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
      pdfUrl, // Add the file URL to the job post
      postedBy: req.user.id,
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
