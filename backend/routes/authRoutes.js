// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, surname, email, password, role, userType } = req.body;

    if (!name || !surname || !email || !password || !role || !userType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      role,
      userType,
      startDate: new Date(), // Assuming startDate is required
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role: newUser.role });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed. Try again later." });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Try again later." });
  }
});

module.exports = router;
