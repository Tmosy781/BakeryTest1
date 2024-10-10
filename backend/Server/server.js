require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;
const dbConnection = require('./dbConnection');
const { errorHandler, requestLogger } = require('./middleware');

//const addRecipeRoute = require('./routes/addRecipeRoute');
//const updateRecipeRoute = require('./routes/updateRecipeRoute');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Import cartRoutes
const orderRoutes = require('./routes/orderRoutes');

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(requestLogger); // Your existing request logging middleware

// Routes
//app.use('/recipe', addRecipeRoute);
//app.use('/recipe', updateRecipeRoute);
app.use('/api/products', productRoutes);
app.use('/users', userRoutes);
app.use('/api', imageRoutes);
app.use('/cart', cartRoutes); // Use cartRoutes
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Error handling middleware (should be last)
app.use(errorHandler); // Your existing error handling middleware

// Production environment: connect to the database and start listening for requests
if (process.env.NODE_ENV !== "test") {
  dbConnection();
  app.listen(PORT, () => {
    setTimeout(() => {
      console.log(`All services are running on port: ${PORT}`);
    }, 1000);
  });
}

module.exports = app;
