require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;
const dbConnection = require('./dbConnection'); // Ensure this path is correct
const { errorHandler, requestLogger } = require('./middleware/index'); // Ensure this path is correct
const addRecipeRoute = require('./routes/addRecipeRoute');
const updateRecipeRoute = require('./routes/updateRecipeRoute');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes'); // Ensure this path is correct

// Middleware
app.use(express.json({ limit: '50mb' })); // Increase the limit if necessary
app.use(cors());
app.use(requestLogger);  // Add request logging middleware

// Routes
app.use('/recipe', addRecipeRoute);
app.use('/recipe', updateRecipeRoute);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/api', imageRoutes); // Use the new imageRoutes with '/api' prefix

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Production environment: connect to the database and start listening for requests
if (process.env.NODE_ENV !== "test") {
  dbConnection();
  app.listen(PORT, () => {
    setTimeout(() => {
      console.log(`All services are running on port: ${PORT}`);
    }, 1000); // Adjust the delay as needed
  });
}

module.exports = app; // Export the app instance for unit testing via supertest.