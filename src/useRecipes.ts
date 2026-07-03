import { useEffect, useState } from "react";
import type { Recipe } from "./types";

const STORAGE_KEY = "recipe-card-maker.recipes";

function loadRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
  } catch {
    return [];
  }
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => loadRecipes());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  function saveRecipe(recipe: Recipe) {
    setRecipes((prev) => {
      const updated = { ...recipe, updatedAt: Date.now() };
      const exists = prev.some((r) => r.id === recipe.id);
      if (exists) {
        return prev.map((r) => (r.id === recipe.id ? updated : r));
      }
      return [updated, ...prev];
    });
  }

  function deleteRecipe(id: string) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  return { recipes, saveRecipe, deleteRecipe };
}
