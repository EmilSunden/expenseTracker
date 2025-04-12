// src/components/Categories/CategoryItem.jsx
import React, { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import ExpenseList from "../Expenses/ExpenseList";
import TotalAmountDisplay from "../Amount/TotalAmountDisplay";
const CategoryItem = ({ category }) => {
  const [showExpenses, setShowExpenses] = useState(false);

  // Prepare a memoized options object
  const options = useMemo(() => ({}), []);

  // When the user toggles to show expenses,
  // we want to fetch them for that specific category.
  // You can choose to fetch automatically on toggle.
  const { data, error, loading, refetch } = useFetch(
    `http://localhost:5000/api/categories/${category.ID}/expenses`,
    options,
    false // Don't auto-fetch; we'll trigger on toggle.
  );

  const toggleExpenses = async () => {
    setShowExpenses((prev) => !prev);
    if (!showExpenses && !data) {
      // If we're opening the drop-down and haven't fetched expenses yet,
      // then fetch them.
      await refetch();
    }
  };

  return (
    <li className="px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <span className="text-gray-800">{category.name}</span>
        <button
          onClick={toggleExpenses}
          className="text-sm text-blue-500 hover:underline focus:outline-none"
        >
          {showExpenses ? "Hide Expenses" : "View Expenses"}
        </button>
      </div>
      {showExpenses && (
        <div className="mt-3">
          {loading && (
            <p className="text-blue-500 text-sm">Loading expenses...</p>
          )}
          {error && (
            <p className="text-red-500 text-sm">Error loading expenses</p>
          )}
          {data && data.expenses && data.expenses.length > 0 ? (
            <>
              <ExpenseList expenses={data.expenses} small />
            </>
          ) : (
            !loading && (
              <p className="text-gray-500 text-sm">No expenses found.</p>
            )
          )}
        </div>
      )}
    </li>
  );
};

export default CategoryItem;
