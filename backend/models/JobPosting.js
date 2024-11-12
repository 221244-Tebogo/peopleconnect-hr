// backend/models/JobPosting.js
// backend/models/JobPosting.js
const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String },
  salaryRange: { type: String },
  applicationDeadline: { type: Date },
  pdfUrl: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  postDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JobPosting", JobPostingSchema);
