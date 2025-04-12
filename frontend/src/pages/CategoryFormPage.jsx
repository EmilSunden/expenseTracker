// src/pages/CategoryFormPage.jsx
import React from "react";
import CategoryForm from "../components/Categories/CategoryForm";

const CategoryFormPage = () => {
  const handleCategorySaved = () => {
    // After saving, you can redirect to the categories overview
    window.location.href = "/categories";
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Add New Category</h1>
      <CategoryForm onCategorySaved={handleCategorySaved} />
    </div>
  );
};

export default CategoryFormPage;
