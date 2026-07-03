import type { Recipe } from "./types";

interface Props {
  recipes: Recipe[];
  activeId: string;
  onSelect: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}

export default function RecipeList({
  recipes,
  activeId,
  onSelect,
  onDelete,
  onNew,
}: Props) {
  return (
    <div className="recipe-list">
      <button type="button" className="new-btn" onClick={onNew}>
        + 新しいレシピ
      </button>
      {recipes.length === 0 && (
        <p className="recipe-list-empty">保存したレシピはまだありません</p>
      )}
      <ul>
        {recipes.map((r) => (
          <li
            key={r.id}
            className={r.id === activeId ? "active" : ""}
            onClick={() => onSelect(r)}
          >
            <span
              className="recipe-list-dot"
              style={{ backgroundColor: r.accentColor }}
            />
            <span className="recipe-list-title">
              {r.title || "無題のレシピ"}
            </span>
            <button
              type="button"
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`「${r.title || "無題のレシピ"}」を削除しますか？`)) {
                  onDelete(r.id);
                }
              }}
              aria-label="レシピを削除"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
