const jwt = require('jsonwebtoken');
const newUserModel = require('../models/userModel'); // Ensure this path is correct

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Authorization Middleware (for admin routes)
const isAdmin = async (req, res, next) => {
  try {
    const user = await newUserModel.findById(req.user.id);
    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admin rights required." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying admin status" });
  }
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
};

// Request Logging Middleware
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

module.exports = {
  authenticateToken,
  isAdmin,
  errorHandler,
  requestLogger,
};