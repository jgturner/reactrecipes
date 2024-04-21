export function Ingredient({ ingredient, onDeleteIngredient, onSetUsed }) {
  let ingredientType = '';
  let ingredientDescription = '';
  let partialMeasurement = '';

  if (ingredient.fullMeasurement > '1' && ingredient.type !== 'none') {
    ingredientType = `${ingredient.type}s`;
  }

  if (ingredient.fullMeasurement <= '1' || ingredientType.fullMeasurement === '0') {
    ingredientType = `${ingredient.type}`;
  }

  if (ingredient.type === 'none') {
    ingredientType = '';
  }

  if (ingredient.fullMeasurement > '1' && ingredient.ingredient === 'egg') {
    ingredientDescription = 'eggs';
    partialMeasurement = '';
  } else {
    ingredientDescription = ingredient.ingredient;
    partialMeasurement = ingredient.partialMeasurement;
  }

  return (
    <li className="flex gap-2 items-center">
      <div>
        <input className="rounded-sm cursor-pointer" type="checkbox" value={ingredient.used} onChange={() => onSetUsed(ingredient.id)} />
      </div>
      <div className={ingredient.used ? 'added capitalize' : 'capitalize'}>{`${ingredient.fullMeasurement === '0' ? '' : ingredient.fullMeasurement} ${
        ingredient.partialMeasurement === '0' ? '' : partialMeasurement
      } ${ingredientType} ${ingredientDescription}`}</div>
      <div className="cursor-pointer" onClick={() => onDeleteIngredient(ingredient.id)}>
        ❌
      </div>
    </li>
  );
}
