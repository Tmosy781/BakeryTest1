// utilities/generateToken.js

const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email, username, isAdmin) => {
  const payload = {
    id,
    email,
    username,
    isAdmin,
  };

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

module.exports = { generateAccessToken };
