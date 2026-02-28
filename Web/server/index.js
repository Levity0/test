const express = require('express');
const cors = require('cors');
const app = express();

//On deployment replace * with vercel url * means allow everything which is fine for now
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


require('dotenv').config();

// Import the Routes
const authRoutes = require('./routes/authRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');


// Middleware
app.use(cors()); 
app.use(express.json()); 

// Use the Routes
// This means all auth routes will start with http://localhost:5000/api/auth
app.use('/api/auth', authRoutes);

// This means ingredient routes will start with http://localhost:5000/api/ingredients
app.use('/api/ingredients', ingredientRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});