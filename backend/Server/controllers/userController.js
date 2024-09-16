const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { newUserValidation, userLoginValidation } = require('../models/userValidator');
const { generateAccessToken } = require('../utilities/generateToken');

const userController = {
  async register(req, res) {
    try {
      const { error } = newUserValidation(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

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
      const { error } = userLoginValidation(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { username, password } = req.body;
      // Add the rest of the login logic here
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController;