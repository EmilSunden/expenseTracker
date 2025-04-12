// src/components/Categories/CategoryList.jsx
import React from "react";
import CategoryItemWithViews from "./CategoryItemWithViews";

const CategoryList = ({ categories }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories exist</p>
      ) : (
        <ul className="space-y-3">
          {categories.map((cat) => (
            <CategoryItemWithViews key={cat.ID} category={cat} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
