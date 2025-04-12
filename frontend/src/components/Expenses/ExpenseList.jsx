// src/components/Expenses/ExpenseList.jsx
import React from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({
  expenses,
  onExpenseUpdated,
  onExpenseEdit,
  onExpenseDelete,
  small,
}) => {
  // Assuming that sorting is handled here or earlier.
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
  );

  return (
    <div className={small ? "text-sm" : ""}>
      <ul className="space-y-2">
        {sortedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.ID}
            expense={expense}
            onExpenseUpdated={onExpenseUpdated}
            onExpenseEdit={onExpenseEdit}
            onExpenseDelete={onExpenseDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
