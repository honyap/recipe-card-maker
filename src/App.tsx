import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import RecipeForm from "./RecipeForm";
import RecipeCard from "./RecipeCard";
import RecipeList from "./RecipeList";
import { useRecipes } from "./useRecipes";
import { createEmptyRecipe, type Recipe } from "./types";

export default function App() {
  const { recipes, saveRecipe, deleteRecipe, loading, error } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe>(createEmptyRecipe);
  const [status, setStatus] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  function handleSave() {
    saveRecipe(recipe);
    setStatus("保存しました");
    setTimeout(() => setStatus(""), 2000);
  }

  function handleNew() {
    setRecipe(createEmptyRecipe());
  }

  function handleDelete(id: string) {
    deleteRecipe(id);
    if (id === recipe.id) {
      handleNew();
    }
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `${recipe.title || "recipe"}.png`;
    link.href = dataUrl;
    link.click();
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="app">
      <header className="app-header no-print">
        <h1>🍳 レシピカードメーカー</h1>
        <p>材料と作り方を入力するだけで、素敵なレシピカードが作れます</p>
      </header>

      <div className="app-body">
        <aside className="sidebar no-print">
          {loading && <p className="status-msg">読み込み中...</p>}
          {error && <p className="status-msg status-error">{error}</p>}
          <RecipeList
            recipes={recipes}
            activeId={recipe.id}
            onSelect={setRecipe}
            onDelete={handleDelete}
            onNew={handleNew}
          />
        </aside>

        <main className="editor no-print">
          <RecipeForm recipe={recipe} onChange={setRecipe} />
          <div className="actions">
            <button type="button" className="primary-btn" onClick={handleSave}>
              保存
            </button>
            <button type="button" onClick={handleDownload}>
              画像として保存
            </button>
            <button type="button" onClick={handlePrint}>
              印刷
            </button>
            {status && <span className="status-msg">{status}</span>}
          </div>
        </main>

        <section className="preview">
          <RecipeCard ref={cardRef} recipe={recipe} />
        </section>
      </div>
    </div>
  );
}
