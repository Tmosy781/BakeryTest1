const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./config/db.config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

const addRecipeRoute = require('./routes/addRecipeRoute');
const updateRecipeRoute = require('./routes/updateRecipeRoute');

// Middleware
app.use(express.json());
app.use(cors());

// Production environment: connect to the database and start listening for requests
if (process.env.NODE_ENV !== "test") {
  dbConnection();
  app.listen(PORT, () => {
    setTimeout(() => {
      console.log(`All services are running on port: ${PORT}`);
    }, 1000); // Add a 1-second delay
  });
}

// Routes
app.use('/recipe', addRecipeRoute);
app.use('/recipe', updateRecipeRoute); 
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app; // Export the app instance for unit testing via supertest.