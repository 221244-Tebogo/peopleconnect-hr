// routes/profile.js
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth"); // Middleware for authentication
const router = express.Router();

// Get the authenticated user's profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name surname email role address phone"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update authenticated user's profile (limited fields)
router.put("/", auth, async (req, res) => {
  const { address, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { address, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
