require("dotenv").config();
const mongoose = require("mongoose");
const Training = require("../models/Training");

const trainingPrograms = [
  {
    name: "Responsible Gambling Awareness",
    description: "Awareness training on responsible gambling",
    duration: "2 hours",
  },
  {
    name: "Customer Service Excellence in Gaming",
    description: "Training on customer service best practices",
    duration: "3 hours",
  },
  {
    name: "Health and Safety Regulations",
    description: "Health and safety compliance training",
    duration: "1 day",
  },
  {
    name: "Casino Floor Management Basics",
    description: "Basics of managing a casino floor",
    duration: "2 days",
  },
  // Add more programs if necessary
];

// Connect to MongoDB and insert the training programs
mongoose
  .connect(process.env.MONGO_URI, { dbName: "hr-connect" })
  .then(async () => {
    console.log("Connected to MongoDB");
    await Training.insertMany(trainingPrograms);
    console.log("Training programs added successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
