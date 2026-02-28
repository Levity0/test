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

  const fetchNewLetter = async (letter: string) => {
    const res = await fetch(`http://localhost:5000/api/home?letter=${letter}`);
    const data = await res.json();
    setRecipes(data);
  };

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
        <h1 className="text-2xl font-semibold mb-4">Beavgridients</h1>

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
                  src={recipe.image}//"https://images.unsplash.com/photo-1707886114260-6ad8219bf2a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWxvJTIwaGFsbyUyMGZpbGlwaW5vJTIwZGVzc2VydHxlbnwxfHx8fDE3NzEyMTIxNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
      <div className="p-6 border-t">
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className={currentPage === 1 ? "bg-gray-100" : ""}>
            1
          </Button>
          <Button variant="ghost" size="sm" className={currentPage === 2 ? "bg-gray-100" : ""}>
            2
          </Button>
          <Button variant="ghost" size="sm" className={currentPage === 3 ? "bg-gray-100" : ""}>
            3
          </Button>
          <span className="px-2 text-gray-400">...</span>
          <Button variant="ghost" size="sm">
            7
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
