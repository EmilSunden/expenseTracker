// src/components/AddExpenseBurger.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddExpenseBurger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button with Hover Effects */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded hover:bg-blue-600 transition-colors focus:outline-none cursor-pointer"
        aria-label="Toggle add expense"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition duration-200 z-50">
          <div className="p-4">
            <Link
              to="/expenses/form"
              onClick={() => setIsOpen(false)}
              className="block text-center text-blue-500 font-semibold hover:text-blue-700 transition-colors"
            >
              Add Expense
            </Link>
          </div>
          <div className="p-4">
            <Link
              to="/categories/add"
              onClick={() => setIsOpen(false)}
              className="block text-center text-blue-500 font-semibold hover:text-blue-700 transition-colors"
            >
              Add Category
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpenseBurger;
