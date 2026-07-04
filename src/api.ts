import type { Recipe } from "./types";

const BASE_URL = "/api/recipes";

export async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`fetchRecipes failed: ${res.status}`);
  return res.json();
}

export async function putRecipe(recipe: Recipe): Promise<Recipe> {
  const res = await fetch(`${BASE_URL}/${recipe.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!res.ok) throw new Error(`putRecipe failed: ${res.status}`);
  return res.json();
}

export async function deleteRecipeApi(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`deleteRecipeApi failed: ${res.status}`);
}
