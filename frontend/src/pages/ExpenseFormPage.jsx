// src/pages/ExpenseFormPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExpenseForm from "../components/Expenses/ExpenseForm";

const ExpenseFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // If editing, the expense is passed in state.
  const expense = location.state?.expense;
  // Create a key that changes based on  whether we're editing or creating.
  const formKey = expense ? "edit" : "create";

  const pageTitle = expense ? "Update Expense" : "Create Expense";

  const handleExpenseSaved = () => {
    navigate("/expenses");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>
      <ExpenseForm
        key={formKey}
        expense={expense}
        onExpenseSaved={handleExpenseSaved}
      />
    </div>
  );
};

export default ExpenseFormPage;
