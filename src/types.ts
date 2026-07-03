export interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: string;
  prepTime: string;
  cookTime: string;
  imageDataUrl: string;
  ingredients: string[];
  steps: string[];
  accentColor: string;
  updatedAt: number;
}

export const ACCENT_COLORS = [
  "#e07a5f",
  "#3d5a80",
  "#81b29a",
  "#f2cc8f",
  "#9b5de5",
  "#4a4e69",
];

export function createEmptyRecipe(): Recipe {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    servings: "",
    prepTime: "",
    cookTime: "",
    imageDataUrl: "",
    ingredients: [""],
    steps: [""],
    accentColor: ACCENT_COLORS[0],
    updatedAt: Date.now(),
  };
}
