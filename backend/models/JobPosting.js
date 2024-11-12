// models/JobPosting.js
const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    salaryRange: { type: String }, // Optional salary range field
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // HR or admin who posted the job
    postDate: { type: Date, default: Date.now },
    applicationDeadline: { type: Date }, // Application deadline for the job
    applications: [
      {
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        coverLetter: { type: String },
        resumeURL: { type: String },
        applicationDate: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Employees who liked the job posting
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPosting", JobPostingSchema);
