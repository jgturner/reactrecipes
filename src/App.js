import { useState } from 'react';
import { Header } from './components/Header';
import { TitleForm } from './components/TitleForm';
import { RecipeForm } from './components/RecipeForm';
import { Recipe } from './components/Recipe';
import { Footer } from './components/Footer';

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
      <main className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1 border-dotted border-neutral-950 border-2 p-4 rounded-md">
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
