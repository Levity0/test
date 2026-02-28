"use client"

import { Search, ChevronRight, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { initialPantryData } from "../data/pantryData";
import type { FoodCategory } from "../data/pantryData";

export function PantryPanel({ isOpen }: { isOpen: boolean }) {
  const [categories, setCategories] = useState<FoodCategory[]>(initialPantryData);

  const toggleCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories[index].collapsed = !newCategories[index].collapsed;
    setCategories(newCategories);
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 border-r bg-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold">Pantry</h2>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Add Ingredients"
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border-b">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{category.type}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => toggleCategory(categoryIndex)}
                >
                  {category.collapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {!category.collapsed && (
                <div className="flex flex-wrap gap-2">
                  {category.ingredients.map((ingredient, ingredientIndex) => (
                    <label
                      key={ingredientIndex}
                      className={`px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                        ingredient.selected
                          ? "bg-green-50 border-green-500 text-green-700"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={ingredient.selected}
                          className="hidden"
                        />
                        <span className="text-sm">{ingredient.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
