// models/Task.js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  comments: [{ type: String }],
});

module.exports = mongoose.model("Task", TaskSchema);
