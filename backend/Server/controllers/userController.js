const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { newUserValidation } = require('../validation/userValidator');

const generateAccessToken = (id, email, username) => {
  return jwt.sign({ id, email, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const userController = {
  async register(req, res) {
    try {
      const validationResult = newUserValidation(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors[0].message });
      }

      const { username, email, password, isAdmin } = req.body;

      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) return res.status(409).json({ message: "User already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false
      });

      await newUser.save();

      const accessToken = generateAccessToken(newUser._id, email, username);
      
      res.status(201).json({ message: "User created successfully", accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "Invalid username or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

      const accessToken = generateAccessToken(user._id, user.email, user.username);
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async editUser(id, userData) {
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return updatedUser;
  },

  async deleteUser(id) {
    await User.findByIdAndDelete(id);
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;