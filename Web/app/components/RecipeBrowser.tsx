"use client"

import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

interface Recipe {
  id: number;
  name: string;
  ingredientsOwned: number;
  totalIngredients: number;
  displayedIngredients: string[];
  hiddenCount: number;
}

export function RecipeBrowser({ initialData }: { initialData: any[] }) {
  const [recipes, setRecipes] = useState(initialData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLetter, setActiveLetter] = useState("a")

  const fetchNewLetter = async (letter: string) => {
    setActiveLetter(letter);
    try{
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'
      const res = await fetch(`${apiBase}/api/home?letter=${letter}`);
      const data = await res.json();
      setRecipes(data);
      setCurrentPage(1);
    }catch (err){
      console.error("Failed to fetch new letter:", err);
    }
    
  };
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  // Mock data for recipes
  // const recipes: Recipe[] = Array(9).fill(null).map((_, i) => ({
  //   id: i,
  //   name: "Lola Mi's Halo Halo",
  //   ingredientsOwned: 14,
  //   totalIngredients: 14,
  //   displayedIngredients: ["Milk", "Sugar", "Ice Cream"],
  //   hiddenCount: 11,
  // }));

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-semibold mb-4">Beavgredients</h1>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Find..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Recipe Image */}
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Recipe Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium">{recipe.name}</h3>
                  <Button size="icon" className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 shrink-0">
                    <span className="text-white text-lg">+</span>
                  </Button>
                </div>

                {/* <p className="text-sm text-gray-600 mb-3">
                  You have all {recipe.totalIngredients} ingredients
                </p> */}

                {/* Ingredient Tags */}
                {/* <div className="flex flex-wrap gap-1.5">
                  {recipe.displayedIngredients.map((ingredient, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-100"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-100"
                  >
                    +{recipe.hiddenCount}
                  </Badge>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap gap-1.5 mb-4 max-w-full">
           {alphabet.map((letter) => (
            <Button
              key={letter}
              variant={activeLetter === letter ? "default" : "outline"}
              size="sm"
              className={`uppercase w-8 h-8 p-0 text-xs shrink-0 ${
                activeLetter === letter ? "bg-green-500 hover:bg-green-700" : ""
              }`}
              onClick={() => fetchNewLetter(letter)}
            >
              {letter}
            </Button>
          ))}
        
      </div>
    </div>
  );
}
