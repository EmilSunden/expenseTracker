// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay: covers the entire viewport with a high z-index */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>
      {/* Sidebar container: higher z-index than the overlay */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 z-60 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Close
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Sidebar;
