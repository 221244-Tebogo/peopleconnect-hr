// backend/models/Training.js
const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  date: { type: Date },
  instructor: { type: String },
});

module.exports = mongoose.model("Training", trainingSchema);
