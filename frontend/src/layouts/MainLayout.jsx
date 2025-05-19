// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import CustomTitleBar from "../components/CustomTitleBar/CustomTitleBar";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <CustomTitleBar />
      <header className="fixed w-full h-12 z-50 bg-blue-500 text-white">
        {/* Navigation, brand, etc. */}
        <Navbar />
      </header>

      <div className="flex flex-1 pt-12 overflow-auto">
        {/* Quick actions */}
        <React.Fragment className="sticky top-0">
          <Sidebar />
        </React.Fragment>
        <main className="flex-1">
          <section className="p-6">
            {/* Additional content */}
            <Outlet />
          </section>
        </main>
      </div>

      <footer className="bg-gray-800 text-gray-300 py-4 text-center">
        © 2025 Your Company Name. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
