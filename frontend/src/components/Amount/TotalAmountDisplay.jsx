// src/components/TotalAmountDisplay.jsx
import React from "react";

const TotalAmountDisplay = ({ amount, label = "Total:" }) => {
  const formattedAmount = Number(amount).toFixed(2);

  return (
    <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-md shadow-sm flex items-center justify-between">
      <span className="font-semibold">{label}</span>
      <span className="text-lg">{formattedAmount} SEK</span>
    </div>
  );
};

export default TotalAmountDisplay;
