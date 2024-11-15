const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from "Bearer <token>"
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Fetch and attach the full user object to req.user
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token." });
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports = auth;
