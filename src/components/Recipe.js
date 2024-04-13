import { useState } from 'react';
import { Ingredient } from './Ingredient';
import { Stats } from './Stats';
import { Filter } from './Filter';

export function Recipe({ recipeName, ingredients, onDeleteIngredient, onDeleteRecipeName, onSetUsed }) {
  const [sort, setSort] = useState('input');

  let sortedItems;

  if (sort === 'input') {
    sortedItems = ingredients;
  }

  if (sort === 'added') {
    sortedItems = ingredients.slice().sort((a, b) => Number(a.used) - Number(b.used));
  }

  if (sort === 'type') {
    sortedItems = ingredients.slice().sort((a, b) => a.type.localeCompare(b.type));
  }

  if (sort === 'ingredient') {
    sortedItems = ingredients.slice().sort((a, b) => a.ingredient.localeCompare(b.ingredient));
  }

  console.log(sortedItems);

  return (
    <aside className="p-3 bg-gray-100 rounded-md">
      <h3 className="text-lg font-bold">
        🍰{!recipeName ? 'Add your recipe name' : recipeName}
        <span className="delete" onClick={onDeleteRecipeName}>
          {recipeName === 'Add your recipe name' ? '' : <span className="text-sm ml-8 hover:underline cursor-pointer">delete</span>}
        </span>
      </h3>

      <Filter sort={sort} setSort={setSort} />

      <ul>
        {sortedItems.length > 0 ? (
          sortedItems.map((ingredient) => <Ingredient ingredient={ingredient} onDeleteIngredient={onDeleteIngredient} onSetUsed={onSetUsed} key={ingredient.id} />)
        ) : (
          <span className="message">🍶 Add ingredients to your recipe to get started.</span>
        )}
      </ul>
      <Stats ingredients={sortedItems} />
    </aside>
  );
}
