// server/routes/ingredientRoutes.js
const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');

// The error happens here if ingredientController.toggleIngredient is undefined
router.post('/toggle', ingredientController.toggleIngredient); 

module.exports = router;