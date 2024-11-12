// backend/routes/careerRoutes.js
const express = require("express");
const router = express.Router();
const Career = require("../models/Career");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to create a new career position
router.post("/", auth, upload.single("file"), async (req, res) => {
  try {
    const { title, department, description, duration } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newPosition = new Career({
      title,
      department,
      description,
      duration,
      fileUrl,
    });

    const savedPosition = await newPosition.save();
    res.status(201).json(savedPosition);
  } catch (error) {
    console.error("Error saving position:", error.message);
    res
      .status(500)
      .json({ message: "Error saving position", error: error.message });
  }
});

// GET route to fetch all career positions
router.get("/", async (req, res) => {
  try {
    const positions = await Career.find();
    res.status(200).json(positions);
  } catch (error) {
    console.error("Error fetching positions:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching positions", error: error.message });
  }
});

module.exports = router;
