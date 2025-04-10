// src/components/ExpenseList.jsx
import React from "react";

const ExpenseList = ({ expenses, onExpenseDeleted, onExpenseEdit }) => {
  // Sort the expenses so that newest come first
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
  );
  console.log("Sorted Expenses:", sortedExpenses);
  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expense/${expenseId}/delete`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }
      // Refresh the expenses list
      onExpenseDeleted();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Expenses</h2>
      <ul>
        {sortedExpenses.map((expense) => (
          <li
            key={expense.ID}
            className="py-2 border-b last:border-none flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-900">{expense.title}</p>
              {expense.description && (
                <p className="text-sm text-gray-600">{expense.description}</p>
              )}
              {expense.category && (
                <p className="text-sm text-gray-600">
                  {expense.category ? expense.category.name : "No category"}
                </p>
              )}
              <p className="text-lg text-green-600">
                ${expense.amount.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(expense.ID)}
                className="cursor-pointer text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
              <button
                onClick={() => onExpenseEdit(expense)}
                className="cursor-pointer text-sm text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
