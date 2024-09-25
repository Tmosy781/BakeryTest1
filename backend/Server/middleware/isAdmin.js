const User = require('../models/userModel');

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

module.exports = isAdmin;
