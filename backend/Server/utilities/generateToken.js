const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, email, username) => {
  const payload = {
    userId,
    email,
    username
  };

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

module.exports = { generateAccessToken };