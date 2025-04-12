// src/components/Expenses/ExpenseItem.jsx
import React, { useEffect, useState } from "react";

const ExpenseItem = ({
  expense,
  onExpenseUpdated,
  onExpenseDelete,
  onExpenseEdit,
}) => {
  // Local state to hold the paid status for optimistic updates.
  const [localIsPaid, setLocalIsPaid] = useState(expense.isPaid ?? false);
  const [localIsRecurring, setLocalIsRecurring] = useState(
    expense.IsRecurring ?? false
  );
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync local state if the expense prop changes.
  useEffect(() => {
    setLocalIsPaid(expense.isPaid ?? false);
    setLocalIsRecurring(expense.is_recurring ?? false); // is_recurring ?
  }, [expense.isPaid, expense.is_recurring]);

  // Handler for toggling paid status with optimistic update.
  const handlePaidChange = async (e) => {
    const newValue = e.target.checked;
    setIsUpdating(true);
    // Optimistically update the UI.
    setLocalIsPaid(newValue);

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expense.ID}/paid-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedExpense = (await response.json()).expense;
      console.log("Toggled paid status:", updatedExpense);
      // Update local state to match the returned value:
      setLocalIsPaid(updatedExpense.IsPaid ?? false);
      // When successful, trigger parent's refresh so that the complete list updates.
      onExpenseUpdated && onExpenseUpdated();
    } catch (error) {
      console.error("Failed to toggle paid status:", error);
      // Roll back the optimistic update if the call fails.
      setLocalIsPaid(expense.IsPaid ?? false);
    }
    setIsUpdating(false);
  };

  // Handler for toggling recurring status with optimistic update.
  const handleRecurringChange = async () => {
    const newValue = !localIsRecurring;
    setLocalIsRecurring(newValue);

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expense.ID}/recurring`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("Toggled recurring status:", result.expense);
      onExpenseUpdated && onExpenseUpdated();
    } catch (error) {
      console.error("Failed to toggle recurring status:", error);
      setLocalIsRecurring(expense.IsRecurring);
    }
  };

  return (
    <li className="py-3 border-b last:border-none">
      {/* Top row for checkboxes */}
      <div className="mb-2 flex items-center gap-6">
        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={localIsPaid}
            onChange={handlePaidChange}
            className="mr-1 cursor-pointer"
          />
          Mark as Paid
        </label>
        <label className="flex items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={localIsRecurring}
            onChange={handleRecurringChange}
            className="mr-1 cursor-pointer"
          />
          Mark as Recurring
        </label>
      </div>
      {/* Main info and remaining actions */}
      <div className="flex justify-between items-center flex-wrap">
        <div>
          <p className="font-semibold text-gray-900">{expense.title}</p>
          {expense.description && (
            <p className="text-sm text-gray-600">{expense.description}</p>
          )}
          <p className="text-lg text-green-600">
            {expense.amount.toFixed(2)} SEK
          </p>
          {expense.category && expense.category.name && (
            <p className="text-sm text-gray-700">
              Category: {expense.category.name}
            </p>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onExpenseEdit(expense)}
            className="cursor-pointer text-sm text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onExpenseDelete(expense.ID)}
            className="cursor-pointer text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default ExpenseItem;
