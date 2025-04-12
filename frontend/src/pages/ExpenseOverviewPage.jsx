// src/pages/ExpenseOverviewPage.jsx
import React, { useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import ExpenseList from "../components/Expenses/ExpenseList";
import TotalAmountDisplay from "../components/Amount/TotalAmountDisplay";
import { useNavigate } from "react-router-dom";

const ExpenseOverviewPage = () => {
  const navigate = useNavigate();
  const options = useMemo(() => ({}), []);

  // Fetch all expenses from a single endpoint.
  const {
    data: allExpensesData,
    error: allExpensesError,
    loading: allExpensesLoading,
    refetch: refetchAllExpenses,
  } = useFetch("http://localhost:5000/api/expenses", options, true);

  // Filter expenses for unpaid and paid lists.
  const unpaidExpenses = useMemo(() => {
    if (allExpensesData && Array.isArray(allExpensesData.expenses)) {
      return allExpensesData.expenses.filter((exp) => !exp.isPaid);
    }
    return [];
  }, [allExpensesData]);

  const paidExpenses = useMemo(() => {
    if (allExpensesData && Array.isArray(allExpensesData.expenses)) {
      return allExpensesData.expenses.filter((exp) => exp.isPaid);
    }
    return [];
  }, [allExpensesData]);

  const totalUnpaid = useMemo(() => {
    return unpaidExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [unpaidExpenses]);

  const totalPaid = useMemo(() => {
    return paidExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [paidExpenses]);

  // Define delete handler.
  const handleExpenseDelete = async (expenseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${expenseId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      refetchAllExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Define edit handler.
  const handleExpenseEdit = (expense) => {
    navigate("/expenses/form", { state: { expense } });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Expenses Overview</h1>

      {/* Section for Unpaid Expenses */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Unpaid Expenses</h2>
        {allExpensesLoading && (
          <p className="text-blue-500">Loading expenses...</p>
        )}
        {allExpensesError && (
          <p className="text-red-500">Error: {allExpensesError.message}</p>
        )}
        {allExpensesData && allExpensesData.expenses && (
          <>
            <TotalAmountDisplay amount={totalUnpaid} label="Total Unpaid:" />
            <ExpenseList
              expenses={unpaidExpenses}
              onExpenseUpdated={refetchAllExpenses}
              onExpenseDelete={handleExpenseDelete}
              onExpenseEdit={handleExpenseEdit}
            />
          </>
        )}
      </div>

      {/* Section for Paid Expenses */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Paid Expenses</h2>
        {allExpensesLoading && (
          <p className="text-blue-500">Loading expenses...</p>
        )}
        {allExpensesError && (
          <p className="text-red-500">Error: {allExpensesError.message}</p>
        )}
        {allExpensesData && allExpensesData.expenses && (
          <>
            <TotalAmountDisplay amount={totalPaid} label="Total Paid:" />
            <ExpenseList
              expenses={paidExpenses}
              onExpenseUpdated={refetchAllExpenses}
              onExpenseDelete={handleExpenseDelete}
              onExpenseEdit={handleExpenseEdit}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverviewPage;
