// src/components/CategoryList.jsx
import React from "react";

const CategoryList = ({ categories }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories exist</p>
      ) : (
        <ul className="space-y-3">
          {categories.map((category) => (
            <li
              key={category.ID}
              className="py-2 border-b last:border-none flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-900">{category.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
