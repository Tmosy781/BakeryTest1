const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const dbUrl = process.env.MONGODB_URI;
    if (!dbUrl) {
      throw new Error("MongoDB connection URL is not defined in environment variables");
    }
    await mongoose.connect(dbUrl); // Removed deprecated options
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
