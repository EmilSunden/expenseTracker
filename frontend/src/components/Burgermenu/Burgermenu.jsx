// src/components/Burgermenu/Burgermenu.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddExpenseBurger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="relative md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none hover:bg-blue-600 rounded"
      >
        {/* Burger icon */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
          <nav className="flex flex-col p-2 space-y-2">
            <Link
              to="/expenses/form"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-gray-100 p-2 rounded"
            >
              Add Expense
            </Link>
            <Link
              to="/categories/add"
              onClick={() => setMenuOpen(false)}
              className="hover:bg-gray-100 p-2 rounded"
            >
              Add Category
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AddExpenseBurger;
