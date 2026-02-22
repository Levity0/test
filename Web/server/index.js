const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// display meals 
app.get("/api/main", async (req, res) => {
  try {
    // fetch the data from meal db
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=a'); //www.themealdb.com/api/json/v1/1/search.php?f=a
    // organize data fetched from TheMealDB
    const rawMealsData = response.data.meals || []; // if meal db returns nothing response is an empty array instead of mapping error
    const organizedMeals = rawMealsData.map (meal =>({ 
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      recipe: meal.strInstructions

    }));
    res.json(organizedMeals);
  }catch(error) { // catch errors from meal db
    console.error("Error fetching meal data from TheMealDB", error);
    res.status(500).json({error: "internal server error"});
  }
});

// display meals based on search
app.get("/api/search", async (req, res) => {
  try {
    const { mealName }  = req.query;
    if (!mealName){
      return res.status(400).json({error: "please provide meal name"}); 
    }
    // fetch the data from meal db
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?', {
      params: { s: mealName }
    }); 
    // organize data fetched from TheMealDB
    const rawMealsData = response.data.meals || [];
    const organizedMeals = rawMealsData.map (meal =>({ 
      id: meal.idMeal,
      name: meal.strMeal,
      category: meal.strCategory,
      area: meal.strArea,
      recipe: meal.strInstructions

    }));
    res.json(organizedMeals);
  }catch(error) { // catch errors from meal db
    console.error("Error fetching meal data from TheMealDB", error);
    res.status(500).json({error: "internal server error"});
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});