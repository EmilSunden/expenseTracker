// src/components/HeroBanner.jsx
import React from "react";

const HeroBanner = () => {
  return (
    <section className="relative flex-1">
      {/* Background Image */}
      <img
        src="/premium_photo-1680721445122-a61ab431cf8d.avif"
        alt="Expenses illustration"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Overlay Text */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Manage Your Expenses
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white drop-shadow-sm">
          Stay organized and in control of your spending.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
