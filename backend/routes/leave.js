// backend/routes/leave.js
const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const Leave = require("../models/Leave");
const User = require("../models/User");
const { calculateLeaveBalance } = require("../helpers/leaveCalculations");

const router = express.Router();
const upload = multer({ dest: "public/leave-docs/" });

// Apply for leave
router.post("/apply", auth, upload.single("document"), async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  const documentUrl = req.file ? `/leave-docs/${req.file.filename}` : null;

  try {
    const leaveApplication = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
      documentUrl,
      status: "Pending",
    });

    await leaveApplication.save();
    res.json(leaveApplication);
  } catch (error) {
    console.error("Error applying for leave:", error.message);
    res.status(500).send("Server Error");
  }
});

// Route to get leave balance based on user type and start date
router.get("/balance", async (req, res) => {
  try {
    const userId = req.user._id; // Assumes user ID is in req.user after authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate the leave balance based on userType and startDate
    const leaveBalance = calculateLeaveBalance(user.userType, user.startDate);
    res.json(leaveBalance);
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    res.status(500).json({ error: "Failed to fetch leave balance" });
  }
});

// users history leave balance
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
