const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const Leave = require("../models/Leave");
const User = require("../models/User");
const { calculateLeaveBalance } = require("../helpers/leaveCalculations");

const router = express.Router();
const upload = multer({ dest: "public/leave-docs/" });

const calculateDaysBetween = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

router.post("/apply", auth, upload.single("document"), async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  const documentUrl = req.file ? `/leave-docs/${req.file.filename}` : null;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return res
        .status(400)
        .json({ error: "Start date cannot be in the past." });
    }

    if (end < start) {
      return res
        .status(400)
        .json({ error: "End date cannot be before start date." });
    }

    const numberOfDays = calculateDaysBetween(startDate, endDate);

    const leaveApplication = new Leave({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason,
      documentUrl,
      status: "Pending",
      numberOfDays,
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

router.get("/balance", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    let leaveBalance = { annualLeaveBalance: 15, sickLeaveBalance: 10 };

    const approvedLeaves = await Leave.find({
      employeeId: userId,
      status: "Approved",
      leaveType: "Annual",
    });

    const totalApprovedDays = approvedLeaves.reduce(
      (total, leave) => total + leave.numberOfDays,
      0
    );

    leaveBalance.annualLeaveBalance -= totalApprovedDays;

    res.json({
      annualLeaveBalance: leaveBalance.annualLeaveBalance,
      sickLeaveBalance: leaveBalance.sickLeaveBalance,
    });
  } catch (error) {
    console.error("Error fetching leave balance:", error);
    res.status(500).json({ error: "Failed to fetch leave balance" });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const leaveHistory = await Leave.find({ employeeId: req.user.id });
    res.json(leaveHistory);
  } catch (error) {
    console.error("Error fetching leave history:", error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/view", auth, async (req, res) => {
  try {
    const leaveApplications = await Leave.find({}).populate(
      "employeeId",
      "name"
    );
    res.json(leaveApplications);
  } catch (error) {
    console.error("Error fetching leave applications:", error.message);
    res.status(500).send("Server Error");
  }
});

// routes/api/leaves.js

router.put("/review/:id", auth, async (req, res) => {
  const { status } = req.body;
  try {
    const leaveApplication = await Leave.findById(req.params.id).populate(
      "employeeId"
    );
    if (!leaveApplication) {
      return res.status(404).json({ msg: "Leave application not found" });
    }

    const user = await User.findById(leaveApplication.employeeId._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Handle leave balance based on review status
    if (status === "Approved" && leaveApplication.leaveType === "Annual") {
      // Deduct leave days from user's balance
      const newBalance =
        (user.annualLeaveBalance ?? 15) - leaveApplication.numberOfDays;
      user.annualLeaveBalance = newBalance >= 0 ? newBalance : 0;
      await user.save();
    } else if (
      status === "Reversed" &&
      leaveApplication.leaveType === "Annual"
    ) {
      // Add back leave days to user's balance
      user.annualLeaveBalance += leaveApplication.numberOfDays;
      await user.save();
    } else if (status === "Declined") {
      // Do nothing to leave balance for a denied application
    }

    // Update leave application status and save
    leaveApplication.status = status;
    await leaveApplication.save();

    res.json({ msg: `Leave ${status.toLowerCase()} successfully` });
  } catch (error) {
    console.error("Error reviewing leave:", error.message);
    res.status(500).json({ error: "Server Error: Unable to review leave" });
  }
});

module.exports = router;
