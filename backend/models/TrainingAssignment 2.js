// models/TrainingAssignment.js
const mongoose = require("mongoose");

const trainingAssignmentSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  training: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training",
    required: true,
  },
  sessions: [
    {
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("TrainingAssignment", trainingAssignmentSchema);
