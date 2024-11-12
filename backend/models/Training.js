// backend/models/Training.js
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: String }, // e.g., "2 hours", "3 days"
  date: { type: Date }, // Optional: a specific date for the training
  instructor: { type: String }, // Optional: name of the trainer
});

module.exports = mongoose.model("Training", trainingSchema);
