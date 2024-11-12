// routes/user.js
const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth"); // Import auth middleware to check authentication and role
const router = express.Router();

// Get all registered users
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("name surname email role");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a user's information
router.put("/:id", auth, async (req, res) => {
  const { name, surname, email } = req.body;

  // Ensure only HR role can perform this action
  if (req.user.role !== "hr") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, surname, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user
router.delete("/:id", auth, async (req, res) => {
  // Ensure only HR role can perform this action
  if (req.user.role !== "hr") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
