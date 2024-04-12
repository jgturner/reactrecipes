import { useState } from 'react';

// const initIngredients = [
//   {
//     fullMeasurement: 2,
//     partialMeasurement: '',
//     type: 'cup',
//     ingredient: 'flour',
//   },
//   {
//     fullMeasurement: 1,
//     partialMeasurement: '3/4',
//     type: 'cup',
//     ingredient: 'unsweetened natural cocoa powder',
//   },
//   {
//     fullMeasurement: 1,
//     partialMeasurement: '3/4',
//     type: 'cup',
//     ingredient: 'granulated sugar',
//   },
//   {
//     fullMeasurement: 2,
//     partialMeasurement: '',
//     type: 'teaspoon',
//     ingredient: 'baking powder',
//   },
//   {
//     fullMeasurement: 1,
//     partialMeasurement: '',
//     type: 'teaspoon',
//     ingredient: 'salt',
//   },
//   {
//     fullMeasurement: 2,
//     partialMeasurement: '',
//     type: 'teaspoon',
//     ingredient: 'espresso powder',
//   },
//   {
//     fullMeasurement: 1,
//     partialMeasurement: '1/2',
//     type: 'cup',
//     ingredient: 'vegetable oil',
//   },
//   {
//     fullMeasurement: 2,
//     partialMeasurement: '',
//     type: 'egg',
//     ingredient: '',
//   },
//   {
//     fullMeasurement: 2,
//     partialMeasurement: '',
//     type: 'teaspoon',
//     ingredient: 'pure vanilla extract',
//   },
//   {
//     fullMeasurement: 1,
//     partialMeasurement: '',
//     type: 'cup',
//     ingredient: 'buttermilk',
//   },
//   {
//     fullMeasurement: 1,
//     partialMeasurement: '',
//     type: 'cup',
//     ingredient: 'freshly brewed strong hot coffee (regular or decaf)',
//   },
// ];

export default function App() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  console.log(ingredients);

  function handleRecipeName(name) {
    setRecipeName((curr) => name);
  }

  function handleDeleteRecipeName() {
    setRecipeName('');
    setIngredients([]);
  }

  function handleAddIngredient(ingredient) {
    setIngredients((ingredients) => [...ingredients, ingredient]);
  }

  function handleSetUsed(id) {
    setIngredients((ingredients) => ingredients.map((ingredient) => (ingredient.id === id ? { ...ingredient, used: !ingredient.used } : ingredient)));
  }

  function handleDeleteIngredient(id) {
    setIngredients((ingredients) => ingredients.filter((ingredient) => ingredient.id !== id));
  }

  return (
    <div className="App">
      <Header />
      <main className="container">
        <div>
          {recipeName === '' && <TitleForm onRecipeName={handleRecipeName} />}
          {recipeName !== '' && <RecipeForm onAddIngredient={handleAddIngredient} />}
          <Recipe
            recipeName={recipeName}
            ingredients={ingredients}
            onDeleteIngredient={handleDeleteIngredient}
            onDeleteRecipeName={handleDeleteRecipeName}
            onSetUsed={handleSetUsed}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>
        <img className="logo" src="./imgs/logo.png" alt="react logo" />
        <span className="family">React</span> Recipes
      </h1>
    </header>
  );
}

function TitleForm({ onRecipeName }) {
  const [formData, setFormData] = useState({
    name: '',
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

    if (!formData.name) return;

    console.log(formData.name);
    onRecipeName(formData.name);

    setFormData({
      name: '',
    });
  }

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3>👩‍🍳Add your recipe name</h3>
      <div>
        <label>Recipe Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <button>Add recipe name</button>
    </form>
  );
}

function RecipeForm({ onAddIngredient }) {
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
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h3>🍶 Add your ingredients</h3>

      <div>
        <label>Full measurement:</label>
        <select name="fullMeasurement" value={formData.fullMeasurement} onChange={handleChange}>
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
        <label>Partial measurement:</label>
        <select name="partialMeasurement" value={formData.partialMeasurement} onChange={handleChange}>
          <option value="1/4">1/4</option>
          <option value="1/3">1/3</option>
          <option value="2/3">2/3</option>
          <option value="1/2">1/2</option>
          <option value="3/4">3/4</option>
          <option value="0">0</option>
        </select>
      </div>

      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="tps">teaspoon/tsp.</option>
          <option value="tbsp">tablespoon/tbsp.</option>
          <option value="cup">cup</option>
          <option value="none">none</option>
        </select>
      </div>

      <div>
        <label>Ingredient:</label>
        <input type="text" name="ingredient" value={formData.ingredient} onChange={handleChange} />
      </div>

      <button>Add ingredient</button>
    </form>
  );
}

function Recipe({ recipeName, ingredients, onDeleteIngredient, onDeleteRecipeName, onSetUsed }) {
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
    <aside className="recipe">
      <h3>
        🍰{!recipeName ? 'Add your recipe name' : recipeName}
        <span className="delete" onClick={onDeleteRecipeName}>
          {recipeName === 'Add your recipe name' ? '' : <span className="btn-edit">edit</span>}
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

function Ingredient({ ingredient, onDeleteIngredient, onSetUsed }) {
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
    <li>
      <div>
        <input type="checkbox" value={ingredient.used} onChange={() => onSetUsed(ingredient.id)} />
      </div>
      <div className={ingredient.used ? 'added' : ''}>{`${ingredient.fullMeasurement === '0' ? '' : ingredient.fullMeasurement} ${
        ingredient.partialMeasurement === '0' ? '' : partialMeasurement
      } ${ingredientType} ${ingredientDescription}`}</div>
      <div className="delete" onClick={() => onDeleteIngredient(ingredient.id)}>
        ❌
      </div>
    </li>
  );
}

function Filter({ sort, setSort }) {
  return (
    <div className="filters">
      <span>Filter Ingredients:</span>
      <button className={sort === 'input' ? 'filter filter-active' : 'filter btn-all'} onClick={() => setSort('input')}>
        all
      </button>
      <button className={sort === 'added' ? 'filter filter-active' : 'filter btn-added'} onClick={() => setSort('added')}>
        added
      </button>
      <button className={sort === 'type' ? 'filter filter-active' : 'filter btn-type'} onClick={() => setSort('type')}>
        type
      </button>
      <button className={sort === 'ingredient' ? 'filter filter-active' : 'filter btn-ingredient'} onClick={() => setSort('ingredient')}>
        ingredient
      </button>
    </div>
  );
}

function Stats({ ingredients }) {
  const numIngredients = ingredients.length;
  const numUsed = ingredients.filter((item) => item.used).length;
  const percentage = Math.round((numUsed / numIngredients) * 100);

  if (!numIngredients) return <p className="stats">add ingredients to get started on your recipe 🍰</p>;

  if (percentage === 0)
    return (
      <p className="stats">
        Your recipe has {numIngredients} ingredients. Start making your dish, {percentage}% complete.
      </p>
    );

  if (percentage === 100) return <p className="stats">Your recipe is {percentage}% complete, ENJOY!🍴</p>;
  return (
    <p className="stats">
      Your recipe has {numUsed} of {numIngredients} ingredients added, and is {percentage}% Complete.
    </p>
  );
}

function Footer() {
  return <p className="footer">Jason Turner learning React.js during Jonas Schmedtmann Ultimate React Course via Udemy</p>;
}
