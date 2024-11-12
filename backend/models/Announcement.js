// backend/models/Announcement.js
const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
