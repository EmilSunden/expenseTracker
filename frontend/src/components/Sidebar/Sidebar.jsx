// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="hidden md:block w-60 bg-white p-4 shadow-md border-r border-gray-200 sticky top-0"
      style={{ top: "1rem", position: "sticky" }}
    >
      {/* top-20 means it stays below a ~5rem (80px) header offset (adjust as needed) */}
      <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
      <nav className="flex flex-col space-y-2">
        <Link
          to="/expenses/form"
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          Add Expense
        </Link>
        <Link
          to="/categories/add"
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          Add Category
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
