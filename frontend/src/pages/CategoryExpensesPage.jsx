// src/pages/CategoryExpensesPage.jsx
import React, { useMemo, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import ExpenseList from "../components/Expenses/ExpenseList";
import { BreadcrumbContext } from "../context/BreadcrumbContext";
import TotalAmountDisplay from "../components/Amount/TotalAmountDisplay";

const CategoryExpensesPage = () => {
  // Grab the category id from the URL parameters.
  const { id } = useParams();
  const { setCustomBreadcrumb } = useContext(BreadcrumbContext);
  // Memoize options so that they don’t cause extra renders.
  const options = useMemo(() => ({}), []);

  // Fetch the expenses for this category.
  // This expects your backend endpoint to return a response of the form:
  // { expenses: [ ... ] }
  const { data, error, loading } = useFetch(
    `http://localhost:5000/api/categories/${id}/expenses`,
    options,
    true // Auto-fetch on mount.
  );

  useEffect(() => {
    if (data && Array.isArray(data.expenses) && data.expenses.length > 0) {
      const categoryName = data.expenses[0].category?.name;
      if (categoryName) {
        setCustomBreadcrumb(categoryName);
      }
    } else {
      setCustomBreadcrumb(`Category ${id}`);
    }
  }, [data, id, setCustomBreadcrumb]);

  // Determine the category name
  // If expenses are returned and the first expense has a category,
  // use that category's name; otherwise fallback to the raw id
  let categoryName = id;
  if (data && Array.isArray(data.expenses) && data.expenses.length > 0) {
    if (data.expenses[0].category && data.expenses[0].category.name) {
      categoryName = data.expenses[0].category.name;
    }
  }
  // Calculate total for all expenses.
  const totalAmount = useMemo(() => {
    if (data && Array.isArray(data.expenses)) {
      return data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
    return 0;
  }, [data]);
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      {loading && <p className="text-blue-500">Loading expenses...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && Array.isArray(data.expenses) && data.expenses.length > 0 ? (
        <>
          <ExpenseList expenses={data.expenses} />
          <TotalAmountDisplay amount={totalAmount} Label="Total:" />
        </>
      ) : (
        !loading && (
          <p className="text-gray-500">No expenses found for this category.</p>
        )
      )}
    </div>
  );
};

export default CategoryExpensesPage;
