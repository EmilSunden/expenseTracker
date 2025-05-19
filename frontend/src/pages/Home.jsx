// src/pages/Home.jsx
import React from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <HeroBanner />
      {/* Additional Content Section - Placeholder */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Features</h2>
          <p className="text-gray-700">
            Here you can add some key points about your expense tracking app,
            such as managing recurring expenses, detailed reporting, and easy
            insights.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto px-4 text-center">
          © 2025 Your Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
