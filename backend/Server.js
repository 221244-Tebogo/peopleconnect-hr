const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "hr-connect" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Importing routes
const authRoutes = require("./routes/auth");
const careerRoutes = require("./routes/career");
const userRoutes = require("./routes/user"); // User routes for managing user data

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/users", userRoutes); // Register the user routes

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
