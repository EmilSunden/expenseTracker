// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold mb-2 md:mb-0">Expense Tracker</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/expenses"
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  Expenses
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="hover:text-gray-200 transition-colors duration-200"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <div className="bg-white p-6 shadow rounded-lg">
          {/* Nested routes will be rendered here */}
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
