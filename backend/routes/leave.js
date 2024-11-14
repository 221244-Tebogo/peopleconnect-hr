// backend/routes/leave.js

const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const Leave = require("../models/Leave");
const User = require("../models/User");
const { calculateLeaveBalance } = require("../helpers/leaveCalculations");

const router = express.Router();
const upload = multer({ dest: "public/leave-docs/" });

// Helper function to calculate days between two dates
const calculateDaysBetween = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including start day
};

// Apply for leave
router.post("/apply", auth, upload.single("document"), async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  const documentUrl = req.file ? `/leave-docs/${req.file.filename}` : null;

  try {
    const numberOfDays = calculateDaysBetween(startDate, endDate);

    const leaveApplication = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
      documentUrl,
      status: "Pending",
      numberOfDays, // Store the number of leave days
    });

    await leaveApplication.save();
    res.json({
      leaveApplication,
      message: `Leave application submitted for ${numberOfDays} days`,
    });
  } catch (error) {
    console.error("Error applying for leave:", error.message);
    res.status(500).send("Server Error");
  }
});

// Route to get leave balance based on user type and start date
// Route to get leave balance based on user type and start date
router.get("/balance", auth, async (req, res) => {
  try {
    // Check if req.user is set by the auth middleware
    if (!req.user || !req.user._id) {
      console.error(
        "User authentication failed. Missing user ID in req.user:",
        req.user
      );
      return res.status(400).json({ error: "User authentication failed." });
    }

    const userId = req.user._id;
    console.log("Fetching leave balance for user ID:", userId);

    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate leave balance with default 15 days annual leave for new users
    const leaveBalance = calculateLeaveBalance(
      user.userType,
      user.startDate
    ) || {
      annualLeaveBalance: 15,
      sickLeaveBalance: 0,
    };

    console.log("Calculated leave balance for user:", userId, leaveBalance);
    res.json(leaveBalance);
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    res.status(500).json({ error: "Failed to fetch leave balance" });
  }
});

// User's leave history
router.get("/history", auth, async (req, res) => {
  try {
    const leaveHistory = await Leave.find({ employeeId: req.user.id });
    res.json(leaveHistory);
  } catch (error) {
    console.error("Error fetching leave history:", error.message);
    res.status(500).send("Server Error");
  }
});

// View leave applications (Manager and HR)
router.get("/view", auth, async (req, res) => {
  try {
    const leaveApplications = await Leave.find({});
    res.json(leaveApplications);
  } catch (error) {
    console.error("Error fetching leave applications:", error.message);
    res.status(500).send("Server Error");
  }
});

// Approve or decline leave (Manager)
router.put("/review/:id", auth, async (req, res) => {
  const { status } = req.body;
  try {
    const leaveApplication = await Leave.findById(req.params.id);
    if (leaveApplication) {
      leaveApplication.status = status;
      await leaveApplication.save();
      res.json({ msg: `Leave ${status.toLowerCase()} successfully` });
    } else {
      res.status(404).json({ msg: "Leave application not found" });
    }
  } catch (error) {
    console.error("Error reviewing leave:", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
