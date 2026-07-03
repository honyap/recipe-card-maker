import { forwardRef } from "react";
import type { Recipe } from "./types";

interface Props {
  recipe: Recipe;
}

const RecipeCard = forwardRef<HTMLDivElement, Props>(({ recipe }, ref) => {
  const ingredients = recipe.ingredients.filter((i) => i.trim() !== "");
  const steps = recipe.steps.filter((s) => s.trim() !== "");

  return (
    <div
      ref={ref}
      className="recipe-card"
      style={{ borderTopColor: recipe.accentColor }}
    >
      {recipe.imageDataUrl && (
        <img
          className="recipe-card-image"
          src={recipe.imageDataUrl}
          alt={recipe.title || "料理写真"}
        />
      )}

      <div className="recipe-card-body">
        <h2 className="recipe-card-title" style={{ color: recipe.accentColor }}>
          {recipe.title || "レシピ名"}
        </h2>

        {recipe.description && (
          <p className="recipe-card-description">{recipe.description}</p>
        )}

        {(recipe.servings || recipe.prepTime || recipe.cookTime) && (
          <div className="recipe-card-meta">
            {recipe.servings && (
              <span>
                <strong>人数</strong> {recipe.servings}
              </span>
            )}
            {recipe.prepTime && (
              <span>
                <strong>準備</strong> {recipe.prepTime}
              </span>
            )}
            {recipe.cookTime && (
              <span>
                <strong>調理</strong> {recipe.cookTime}
              </span>
            )}
          </div>
        )}

        <div className="recipe-card-columns">
          {ingredients.length > 0 && (
            <div className="recipe-card-section">
              <h3 style={{ borderColor: recipe.accentColor }}>材料</h3>
              <ul className="recipe-card-ingredients">
                {ingredients.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {steps.length > 0 && (
            <div className="recipe-card-section">
              <h3 style={{ borderColor: recipe.accentColor }}>作り方</h3>
              <ol className="recipe-card-steps">
                {steps.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

RecipeCard.displayName = "RecipeCard";

export default RecipeCard;
