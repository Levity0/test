const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import the Routes
const authRoutes = require('./routes/authRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');

const app = express();

// Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json()); // Allows the server to read JSON data from the frontend

// 2. Use the Routes
// This means all auth routes will start with http://localhost:5000/api/auth
app.use('/api/auth', authRoutes);

// This means ingredient routes will start with http://localhost:5000/api/ingredients
app.use('/api/ingredients', ingredientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});