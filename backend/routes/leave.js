// backend/routes/leave.js
const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const Leave = require("../models/Leave");
const User = require("../models/User");

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

// leave balance
router.get("/balance", auth, async (req, res) => {
  try {
    // Assuming the User model includes a leaveBalance field
    const user = await User.findById(req.user.id).select("leaveBalance");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ leaveBalance: user.leaveBalance });
  } catch (error) {
    console.error("Error fetching leave balance:", error.message);
    res.status(500).send("Server Error");
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
