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
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Import the order routes

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);  // Add request logging middleware

// Routes
app.use('/api/recipes', addRecipeRoute);
app.use('/api/recipes', updateRecipeRoute);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/images', getImageRoute);
app.use('/api/images', postImageRoute);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes); // Add the order routes

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Production environment: connect to the database and start listening for requests
if (process.env.NODE_ENV !== "test") {
  dbConnection(); // Ensure the database connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}