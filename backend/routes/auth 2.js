// Backend - routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

const router = express.Router();

// routes/auth.js - Registration endpoint
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body; // Ensure role is included
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password, role }); // Set role here
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, role: newUser.role }); // Return token and role
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// routes/auth.js - Login endpoint with debug logs
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    console.log("User role from database:", user.role); // Debug log

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, role: user.role }); // Return both token and role
  } catch (error) {
    console.error("Login error:", error); // Log server error if any
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
