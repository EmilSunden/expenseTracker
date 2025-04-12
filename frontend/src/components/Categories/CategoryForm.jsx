// src/components/CategoryForm.jsx
import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

const CategoryForm = ({ onCategorySaved }) => {
  const [categoryName, setCategoryName] = useState("");

  // Set up the custom hook for creating a category (POST).
  // autoFetch is disabled so that the request is only triggered on submit.
  const { loading, error, refetch } = useFetch(
    "http://localhost:5000/api/categories",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build the payload with the category name.
    const payload = { category_name: categoryName };
    console.log("Category Data Submitted: ", payload);

    // Trigger the POST request.
    await refetch({
      body: JSON.stringify(payload),
    });
    // Refresh the category list through the parent's callback.
    if (onCategorySaved) {
      onCategorySaved();
    }

    // Clear the input.
    setCategoryName("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Category</h2>
      <div className="mb-4">
        <label
          htmlFor="category_name"
          className="block mb-1 font-semibold text-gray-700"
        >
          Category Name{" "}
          <span className="text-sm text-gray-500">(optional)</span>
        </label>
        <input
          id="category_name"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && <p className="mb-4 text-blue-500">Submitting Category...</p>}
      {error && <p className="mb-4 text-red-500">Error: {error.message}</p>}

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Create Category
      </button>
    </form>
  );
};

export default CategoryForm;
