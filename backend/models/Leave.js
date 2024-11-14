// backend/models/Leave.js
const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  leaveType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String },
  documentUrl: { type: String },
  status: { type: String, default: "Pending" },
  numberOfDays: { type: Number, required: true }, // New field for days of leave
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Manager reference if needed
});

module.exports = mongoose.model("Leave", leaveSchema);
