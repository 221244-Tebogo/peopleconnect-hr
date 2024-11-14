// // backend/middleware/auth.js

// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const auth = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token)
//     return res
//       .status(401)
//       .json({ message: "Access denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id); // Retrieve full user data if necessary

//     if (!req.user) throw new Error("User not found");
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

// module.exports = auth;

// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = auth;
