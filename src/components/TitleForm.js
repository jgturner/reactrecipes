import { useState } from 'react';

export function TitleForm({ onRecipeName }) {
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
    <div className="p-3 bg-gray-100 rounded-md">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold">👩‍🍳Add your recipe name</h3>
        <div>
          <label className="font-bold mr-2">Recipe Name:</label>
          <input className="border-b-4 border-neutral-950 mt-3 text-md py-1 rounded-t-md" type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <button className="bg-black text-white px-3 py-2 rounded-md mt-3">Add recipe name</button>
      </form>
    </div>
  );
}
