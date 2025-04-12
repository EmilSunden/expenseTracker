// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import AddExpenseBurger from "../components/Burgermenu/Burgermenu";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">MyApp</h1>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200 transition-colors">
              Home
            </Link>
            <Link
              to="/categories"
              className="hover:text-gray-200 transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/expenses"
              className="hover:text-gray-200 transition-colors"
            >
              Expenses
            </Link>
            {/* Add the burger component for triggering the "Add Expense" form view */}
            <AddExpenseBurger />
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-2">
        <Breadcrumbs />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="bg-white p-6 shadow rounded-lg">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto px-4 text-center">
          © 2025 Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
