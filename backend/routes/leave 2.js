// const express = require("express");
// const router = express.Router();
// const Leave = require("../models/Leave");
// const auth = require("../middleware/auth");

// // Apply for leave route
// router.post("/apply", auth, async (req, res) => {
//   try {
//     const { leaveType, startDate, endDate, reason } = req.body;

//     const newLeave = new Leave({
//       employee: req.user.id,
//       leaveType,
//       startDate,
//       endDate,
//       reason,
//       status: "Pending",
//     });

//     await newLeave.save();
//     res
//       .status(200)
//       .json({ message: "Leave application submitted successfully", newLeave });
//   } catch (error) {
//     console.error("Error applying for leave:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // Get leave balance route
// router.get("/balance/:userType", auth, async (req, res) => {
//   try {
//     const userType = req.params.userType;
//     let balance = {
//       annual: userType === "shift" ? 15 : 20,
//       sick: 10,
//       maternity: userType === "office" ? 60 : 90,
//     };
//     res.status(200).json(balance);
//   } catch (error) {
//     console.error("Error fetching leave balance:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// module.exports = router;

//backend/routes/leaveRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Import controller functions
const {
  getUnapprovedLeaves,
  approveLeave,
  deleteLeave,
  applyForLeave,
  getLeaveHistory,
  getLeaveBalance,
} = require("../controllers/leaveController");

console.log("getLeaveBalance:", typeof getLeaveBalance); // Should log "function"

// Route definitions
router.get("/unapproved", auth, getUnapprovedLeaves);
router.put("/approve/:id", auth, approveLeave);
router.delete("/:id", auth, deleteLeave);
router.post("/apply", auth, applyForLeave);
router.get("/history", auth, getLeaveHistory);
router.get("/balance", auth, getLeaveBalance); // Ensure this route is defined

module.exports = router;
