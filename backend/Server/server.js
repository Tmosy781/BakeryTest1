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
const getImageRoute = require('./routes/getImage');
const postImageRoute = require('./routes/postImage');

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);  // Add request logging middleware

// Routes
app.use('/recipe', addRecipeRoute);
app.use('/recipe', updateRecipeRoute);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/image', getImageRoute);
app.use('/image', postImageRoute);

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
    }, 1000); // Add a 1-second delay
  });
}

module.exports = app; // Export the app instance for unit testing via supertest.