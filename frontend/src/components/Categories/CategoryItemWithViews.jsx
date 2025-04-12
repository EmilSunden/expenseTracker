// src/components/Categories/CategoryItemWithViews.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ExpenseList from "../Expenses/ExpenseList";
import TotalAmountDisplay from "../Amount/TotalAmountDisplay";

const CategoryItemWithViews = ({ category }) => {
  const [showInlineExpenses, setShowInlineExpenses] = useState(false);
  const options = useMemo(() => ({}), []);

  // Fetch expenses for this category when needed.
  const { data, error, loading, refetch } = useFetch(
    `http://localhost:5000/api/categories/${category.ID}/expenses`,
    options,
    false
  );

  const toggleExpenses = async () => {
    setShowInlineExpenses((prev) => !prev);
    if (!showInlineExpenses && !data) {
      await refetch();
    }
  };

  // Calculate total expenses using useMemo.
  const totalAmount = useMemo(() => {
    if (data && Array.isArray(data.expenses)) {
      return data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
    return 0;
  }, [data]);

  return (
    <li className="px-4 py-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <span className="text-gray-800 font-semibold">{category.name}</span>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <Link
            to={`/categories/${category.ID}/expenses`}
            className="text-sm text-blue-500 hover:underline"
          >
            View Category
          </Link>
          <button
            onClick={toggleExpenses}
            className="text-sm text-blue-500 hover:underline focus:outline-none"
          >
            {showInlineExpenses ? "Hide Expenses" : "Show Expenses"}
          </button>
        </div>
      </div>
      {showInlineExpenses && (
        <div className="mt-3">
          {loading && (
            <p className="text-blue-500 text-sm">Loading expenses...</p>
          )}
          {error && (
            <p className="text-red-500 text-sm">Error loading expenses</p>
          )}
          {data && Array.isArray(data.expenses) && data.expenses.length > 0 ? (
            <>
              {/* Render ExpenseList so the last expense item gets its bottom border */}
              <ExpenseList expenses={data.expenses} small />
              {/* Wrap the total display in its own container with margin */}
              <div className="mt-4">
                <TotalAmountDisplay amount={totalAmount} label="Total:" />
              </div>
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

export default CategoryItemWithViews;
