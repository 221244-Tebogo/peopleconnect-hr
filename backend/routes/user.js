// routes/user.js
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get all registered users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name email role"); // Fetch users
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
