// src/pages/CategoryPage.jsx
import React, { useMemo, useState } from "react";
import CategoryForm from "../components/Forms/CategoryForm";
import CategoryList from "../components/Categories/CategoryList";
import { useFetch } from "../hooks/useFetch";

const CategoryPage = () => {
  // Memoize an empty options object so it stays stable
  const options = useMemo(() => ({}), []);

  // Use the custom GET hook to fetch categories.
  // Assume the endpoint returns an object like { categories: [...] }
  const { data, error, loading, refetch } = useFetch(
    "http://localhost:5000/api/categories/get",
    options,
    true
  );
  console.log("Fetched categories:", data);
  // Callback to refresh the categories list after creating a new category.
  const handleCategorySaved = () => {
    refetch();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Category Form */}
        <div className="md:w-1/2">
          <CategoryForm onCategorySaved={handleCategorySaved} />
        </div>
        {/* Right Column: Category List */}
        <div className="md:w-1/2">
          {loading && <p className="text-blue-500">Loading categories...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && Array.isArray(data) && <CategoryList categories={data} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
