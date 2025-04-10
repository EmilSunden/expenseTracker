// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Shared Header/Nav */}
      <header className="mb-4">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-500">
                About
              </Link>
            </li>
            {/* Add other navigation links */}
            <li>
              <Link to="/expenses" className="text-blue-500">
                Expenses
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Outlet is where nested routes will be rendered */}
        <Outlet />
      </main>

      {/* Optional Footer */}
      <footer className="mt-8 text-center text-gray-500">
        © 2025 Your Company Name
      </footer>
    </div>
  );
};

export default MainLayout;
