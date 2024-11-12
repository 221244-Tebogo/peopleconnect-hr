// backend/routes/announcements.js
const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// Create new announcement
router.post("/", async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.json(announcement);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Like an announcement
router.put("/:id/like", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    announcement.likes = (announcement.likes || 0) + 1;
    await announcement.save();
    res.json(announcement);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Comment on an announcement
router.post("/:id/comment", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    announcement.comments.push(req.body.comment);
    await announcement.save();
    res.json(announcement);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
