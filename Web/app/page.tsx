"use client"

import { useState, useEffect } from "react";
import { PantryPanel } from "./components/PantryPanel";
import { RecipeBrowser } from "./components/RecipeBrowser";
import { RecipeCart } from "./components/RecipeCart";
import { Button } from "./components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {supabase} from "@/api/supabase"; // Ensure this path matches your project structure

// Mock User ID - Ensure this matches the ID used in your Supabase 'ingredients' table
const TEST_USER_ID = "cc83483f-40ee-47f1-87eb-62c962c279bc";

async function getRecipes(){
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  const res = await fetch(`${apiBase}/api/home?letter=a`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default function App() {
  const [isPantryOpen, setIsPantryOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- KART & PANTRY STATE ---
  const [kart, setKart] = useState<any[]>([]);
  const [pantryItems, setPantryItems] = useState<string[]>([]); // Added this state

  const addToKart = (recipe: any) => {
    const recipeId = recipe.id || recipe.idMeal;
    if (!kart.find(item => (item.id || item.idMeal) === recipeId)) {
      setKart(prev => [...prev, recipe]);
    }
  };

  const removeFromKart = (recipeId: any) => {
    setKart(prev => prev.filter(item => (item.id || item.idMeal) !== recipeId));
  };

  // 1. Effect to load Recipes
  useEffect(() => {
    getRecipes().then(data => {
      setRecipes(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  // 2. Effect to fetch Pantry Items from Supabase (Used for ingredient subtraction)
  useEffect(() => {
    const fetchPantry = async () => {
      try {
        const { data, error } = await supabase
          .from("ingredients")
          .select("name")
          .eq("user_id", TEST_USER_ID);

        if (error) throw error;
        
        if (data) {
          // Normalize to lowercase strings for accurate comparison
          setPantryItems(data.map(item => item.name.toLowerCase()));
        }
      } catch (err) {
        console.error("Error fetching pantry items:", err);
      }
    };

    fetchPantry();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="flex h-screen bg-white overflow-hidden min-w-[1200px]">
      <div className="relative">
        <PantryPanel isOpen={isPantryOpen} />
        <Button
          variant="outline" size="icon"
          className={`absolute top-1/2 z-20 transform -translate-y-1/2 transition-all rounded-full bg-white shadow-md ${isPantryOpen ? 'right-0 translate-x-1/2' : 'left-0'}`}
          onClick={() => setIsPantryOpen(!isPantryOpen)}
        >
          {isPantryOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Middle Panel - Passing addToKart */}
      <RecipeBrowser initialData={recipes} onAddToKart={addToKart} />

      <div className="relative">
        {/* Right Panel - Passing Kart State, Pantry List, and remove function */}
        <RecipeCart 
          isOpen={isCartOpen} 
          selectedRecipes={kart}
          pantryItems={pantryItems} 
          onRemove={removeFromKart} 
        />
        <Button
          variant="outline" size="icon"
          className={`absolute top-1/2 z-20 transform -translate-y-1/2 transition-all rounded-full bg-white shadow-md ${isCartOpen ? 'left-0 -translate-x-1/2' : 'right-0'}`}
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          {isCartOpen ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
    </div>
  );
}