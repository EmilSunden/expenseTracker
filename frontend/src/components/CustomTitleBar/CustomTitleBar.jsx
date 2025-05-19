// src/components/CustomTitleBar/CustomTitleBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomTitleBar = () => {
  // Local state for opening/closing the burger menu (on small screens)
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMinimize = () => {
    window.electronAPI?.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI?.maximize();
  };

  const handleClose = () => {
    window.electronAPI?.close();
  };

  // Toggle the small screen menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg z-60 flex items-center"
      style={{ WebkitAppRegion: "drag" }}
    >
      {/* Brand / Logo */}
      <div className="pl-4 pr-2 font-bold text-xl flex-shrink-0">MyApp</div>

      {/* Desktop Nav Links (hidden on small screens) */}
      <nav
        className="hidden md:flex flex-1 items-center space-x-4 ml-4"
        style={{ WebkitAppRegion: "no-drag" }}
      >
        <Link to="/" className="hover:text-gray-200 transition-colors">
          Home
        </Link>
        <Link
          to="/categories"
          className="hover:text-gray-200 transition-colors"
        >
          Categories
        </Link>
        <Link to="/expenses" className="hover:text-gray-200 transition-colors">
          Expenses
        </Link>
      </nav>

      {/* Burger Icon for small screens */}
      <div
        className="md:hidden ml-auto px-4"
        style={{ WebkitAppRegion: "no-drag" }}
      >
        <button
          onClick={toggleMenu}
          className="focus:outline-none hover:bg-blue-600 p-1 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Window Controls on the right (for all screens) */}
      <div
        className="hidden md:flex items-center space-x-2 px-4"
        style={{ WebkitAppRegion: "no-drag" }}
      >
        <button
          onClick={handleMinimize}
          className="hover:bg-blue-600 p-1 rounded"
        >
          _
        </button>
        <button
          onClick={handleMaximize}
          className="hover:bg-blue-600 p-1 rounded"
        >
          □
        </button>
        <button onClick={handleClose} className="hover:bg-red-600 p-1 rounded">
          ×
        </button>
      </div>

      {/* If you also want window controls on small screens, place them inside the menu or separately */}
      {/* Small screen menu dropdown */}
      {menuOpen && (
        <div
          className="absolute top-12 left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white z-50 md:hidden"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="hover:text-gray-200 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="hover:text-gray-200 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/expenses"
              className="hover:text-gray-200 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Expenses
            </Link>
            {/* Optionally add window controls here for small screens */}
            <div className="mt-4 flex items-center space-x-2">
              <button
                onClick={handleMinimize}
                className="hover:bg-blue-600 p-1 rounded"
              >
                _
              </button>
              <button
                onClick={handleMaximize}
                className="hover:bg-blue-600 p-1 rounded"
              >
                □
              </button>
              <button
                onClick={handleClose}
                className="hover:bg-red-600 p-1 rounded"
              >
                ×
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CustomTitleBar;
