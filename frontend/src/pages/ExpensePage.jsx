// src/pages/ExpensePage.jsx
import React, { useMemo, useState } from "react";
import ExpenseForm from "../components/Forms/ExpenseForm";
import ExpenseList from "../components/Expenses/ExpenseList";
import { useFetch } from "../hooks/useFetch";

const ExpensePage = () => {
  // useFetch to get the expenses list
  const options = useMemo(() => ({}), []);
  const { data, error, loading, refetch } = useFetch(
    "http://localhost:5000/api/expenses/get",
    options,
    true // autoFetch on mount
  );

  // State for the currently selected expense (for update)
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Callback to refresh expenses and clear the selected expense after a create/update
  const handleExpenseSaved = () => {
    refetch();
    setSelectedExpense(null);
  };

  // Callback to handle when an expense is selected for editing
  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Form */}
        <div className="md:w-1/2">
          <ExpenseForm
            expense={selectedExpense}
            onExpenseSaved={handleExpenseSaved}
          />
        </div>
        {/* Right Column: Expense List */}
        <div className="md:w-1/2">
          {loading && <p className="text-blue-500">Loading expenses...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && data.expenses && (
            <ExpenseList
              expenses={data.expenses}
              onExpenseDeleted={handleExpenseSaved}
              onExpenseEdit={handleEditExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
