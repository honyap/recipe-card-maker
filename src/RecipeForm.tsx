import type { ChangeEvent } from "react";
import { ACCENT_COLORS, type Recipe } from "./types";

interface Props {
  recipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export default function RecipeForm({ recipe, onChange }: Props) {
  function update<K extends keyof Recipe>(key: K, value: Recipe[K]) {
    onChange({ ...recipe, [key]: value });
  }

  function updateListItem(
    key: "ingredients" | "steps",
    index: number,
    value: string,
  ) {
    const list = [...recipe[key]];
    list[index] = value;
    update(key, list);
  }

  function addListItem(key: "ingredients" | "steps") {
    update(key, [...recipe[key], ""]);
  }

  function removeListItem(key: "ingredients" | "steps", index: number) {
    const list = recipe[key].filter((_, i) => i !== index);
    update(key, list.length > 0 ? list : [""]);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("imageDataUrl", reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <form className="recipe-form" onSubmit={(e) => e.preventDefault()}>
      <label className="field">
        <span>料理名</span>
        <input
          type="text"
          placeholder="例：鶏の照り焼き"
          value={recipe.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </label>

      <label className="field">
        <span>ひとこと説明</span>
        <textarea
          placeholder="このレシピの魅力を一言で"
          value={recipe.description}
          onChange={(e) => update("description", e.target.value)}
          rows={2}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>人数</span>
          <input
            type="text"
            placeholder="2人分"
            value={recipe.servings}
            onChange={(e) => update("servings", e.target.value)}
          />
        </label>
        <label className="field">
          <span>準備時間</span>
          <input
            type="text"
            placeholder="10分"
            value={recipe.prepTime}
            onChange={(e) => update("prepTime", e.target.value)}
          />
        </label>
        <label className="field">
          <span>調理時間</span>
          <input
            type="text"
            placeholder="20分"
            value={recipe.cookTime}
            onChange={(e) => update("cookTime", e.target.value)}
          />
        </label>
      </div>

      <label className="field">
        <span>写真</span>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>

      <div className="field">
        <span>カードの色</span>
        <div className="color-swatches">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={
                "swatch" + (recipe.accentColor === color ? " selected" : "")
              }
              style={{ backgroundColor: color }}
              onClick={() => update("accentColor", color)}
              aria-label={`カラー ${color}`}
            />
          ))}
        </div>
      </div>

      <div className="field">
        <span>材料</span>
        {recipe.ingredients.map((item, i) => (
          <div className="list-row" key={i}>
            <input
              type="text"
              placeholder="材料と分量"
              value={item}
              onChange={(e) =>
                updateListItem("ingredients", i, e.target.value)
              }
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeListItem("ingredients", i)}
              aria-label="材料を削除"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addListItem("ingredients")}
        >
          + 材料を追加
        </button>
      </div>

      <div className="field">
        <span>作り方</span>
        {recipe.steps.map((item, i) => (
          <div className="list-row" key={i}>
            <span className="step-number">{i + 1}</span>
            <textarea
              placeholder="手順を入力"
              value={item}
              rows={2}
              onChange={(e) => updateListItem("steps", i, e.target.value)}
            />
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeListItem("steps", i)}
              aria-label="手順を削除"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addListItem("steps")}
        >
          + 手順を追加
        </button>
      </div>
    </form>
  );
}
