const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin } = require('../middleware');
const newUserModel = require('../models/userModel');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Edit User
router.put('/edit/:id', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await userController.editUser(req.params.id, req.body);
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete User
router.delete('/delete/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await userController.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get All Users (Admin only)
router.get('/all', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await userController.getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Change Password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    await userController.changePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete All Users (Admin only, be cautious with this route)
router.delete('/deleteAll', authenticateToken, isAdmin, async (req, res) => {
  try {
    await userController.deleteAllUsers();
    res.json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;