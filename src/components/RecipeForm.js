import { useState } from 'react';

export function RecipeForm({ onAddIngredient }) {
  const [formData, setFormData] = useState({
    id: '',
    fullMeasurement: '1',
    partialMeasurement: '0',
    type: 'tsp',
    ingredient: '',
    used: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.ingredient || !formData.fullMeasurement) return;

    const newId = crypto.randomUUID();

    onAddIngredient({ ...formData, id: newId });

    setFormData({
      id: '',
      fullMeasurement: '1',
      partialMeasurement: '0',
      type: '',
      ingredient: '',
      used: false,
    });
  }

  return (
    <div className="p-3 bg-gray-100 rounded-md">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold">🍶 Add your ingredients</h3>

        <div>
          <label className="font-bold mr-2">Full measurement:</label>
          <select
            className="border-b-4 border-neutral-950 mt-3 text-md py-1 rounded-t-md"
            name="fullMeasurement"
            value={formData.fullMeasurement}
            onChange={handleChange}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>

        <div>
          <label className="font-bold mr-2">Partial measurement:</label>
          <select
            className="border-b-4 border-neutral-950 mt-3 text-md py-1 rounded-t-md"
            name="partialMeasurement"
            value={formData.partialMeasurement}
            onChange={handleChange}
          >
            <option value="1/4">1/4</option>
            <option value="1/3">1/3</option>
            <option value="2/3">2/3</option>
            <option value="1/2">1/2</option>
            <option value="3/4">3/4</option>
            <option value="0">0</option>
          </select>
        </div>

        <div>
          <label className="font-bold mr-2">Type:</label>
          <select className="border-b-4 border-neutral-950 mt-3 text-md py-1 rounded-t-md" name="type" value={formData.type} onChange={handleChange}>
            <option value="tps">teaspoon/tsp.</option>
            <option value="tbsp">tablespoon/tbsp.</option>
            <option value="cup">cup</option>
            <option value="none">none</option>
          </select>
        </div>

        <div>
          <label className="font-bold mr-2">Ingredient:</label>
          <input
            className="border-b-4 border-neutral-950 mt-3 text-md py-1 rounded-t-md"
            type="text"
            name="ingredient"
            value={formData.ingredient}
            onChange={handleChange}
          />
        </div>

        <button className="bg-black text-white px-3 py-2 rounded-md mt-3">Add ingredient</button>
      </form>
    </div>
  );
}
