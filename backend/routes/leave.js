const express = require("express");
const multer = require("multer");
const moment = require("moment");
const auth = require("../middleware/auth");
const Leave = require("../models/Leave");
const User = require("../models/User"); // Ensure User model is imported

const router = express.Router();
const upload = multer({ dest: "public/leave-docs/" });

// Apply for leave with weekend restriction for office employees
router.post("/apply", auth, upload.single("document"), async (req, res) => {
  const { leaveType, startDate, endDate, reason } = req.body;
  const documentUrl = req.file ? `/leave-docs/${req.file.filename}` : null;

  try {
    const user = await User.findById(req.user.id);
    const startDay = moment(startDate).day();

    // Restrict office employees from applying for leave on weekends
    if (user.userType === "office" && (startDay === 0 || startDay === 6)) {
      return res.status(400).json({
        message: "Office employees cannot apply for leave on weekends.",
      });
    }

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

// View leave applications (Manager and HR)
router.get("/view", auth, async (req, res) => {
  try {
    const leaveApplications = await Leave.find({
      $or: [{ managerId: req.user.id }, { role: "hr" }], // Filter for manager or HR
    });
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
