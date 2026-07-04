import { useEffect, useState } from "react";
import type { Recipe } from "./types";
import { deleteRecipeApi, fetchRecipes, putRecipe } from "./api";

const STORAGE_KEY = "recipe-card-maker.recipes";

function loadLocalRecipes(): Recipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
  } catch {
    return [];
  }
}

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const serverRecipes = await fetchRecipes();
        if (cancelled) return;

        if (serverRecipes.length === 0) {
          const localRecipes = loadLocalRecipes();
          if (localRecipes.length > 0) {
            await Promise.all(localRecipes.map((r) => putRecipe(r)));
            localStorage.removeItem(STORAGE_KEY);
            if (!cancelled) setRecipes(localRecipes);
            return;
          }
        }
        setRecipes(serverRecipes);
      } catch {
        if (!cancelled) setError("レシピの読み込みに失敗しました");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  function saveRecipe(recipe: Recipe) {
    const updated = { ...recipe, updatedAt: Date.now() };
    setRecipes((prev) => {
      const exists = prev.some((r) => r.id === recipe.id);
      return exists
        ? prev.map((r) => (r.id === recipe.id ? updated : r))
        : [updated, ...prev];
    });
    setError("");
    putRecipe(updated).catch(() => setError("保存に失敗しました"));
  }

  function deleteRecipe(id: string) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setError("");
    deleteRecipeApi(id).catch(() => setError("削除に失敗しました"));
  }

  return { recipes, saveRecipe, deleteRecipe, loading, error };
}
