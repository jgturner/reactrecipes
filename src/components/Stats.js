export function Stats({ ingredients }) {
  const numIngredients = ingredients.length;
  const numUsed = ingredients.filter((item) => item.used).length;
  const percentage = Math.round((numUsed / numIngredients) * 100);

  if (!numIngredients) return <p className="text-sm text-center mt-5">add ingredients to get started on your recipe 🍰</p>;

  if (percentage === 0)
    return (
      <p className="text-sm mt-5 text-center">
        Your recipe has {numIngredients} ingredients. Start making your dish, {percentage}% complete.
      </p>
    );

  if (percentage === 100) return <p className="text-sm mt-5 text-center">Your recipe is {percentage}% complete, ENJOY!🍴</p>;
  return (
    <p className="text-sm mt-5">
      Your recipe has {numUsed} of {numIngredients} ingredients added, and is {percentage}% Complete.
    </p>
  );
}
