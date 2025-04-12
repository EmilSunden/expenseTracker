// src/components/Expenses/ExpenseForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";

const ExpenseForm = ({ expense, onExpenseSaved }) => {
  // Set up local state for the expense fields; pre-fill if editing.
  const [title, setTitle] = useState(expense ? expense.title : "");
  const [description, setDescription] = useState(
    expense ? expense.description : ""
  );
  const [amount, setAmount] = useState(
    expense ? expense.amount.toString() : ""
  );
  const [isRecurring, setIsRecurring] = useState(
    expense ? expense.isRecurring : true
  );
  // New state for category (store the ID as a string)
  const [categoryId, setCategoryId] = useState(expense?.category?.ID || "");

  // Memoize options for fetch to avoid unnecessary re-fetches.
  const options = useMemo(() => ({}), []);

  // Fetch categories from the endpoint.
  // Adjust this if your endpoint returns data as { categories: [...] } or as an array.
  const {
    data: categoriesData,
    error: categoryError,
    loading: categoriesLoading,
  } = useFetch("http://localhost:5000/api/categories", options, true);
  console.log("Fetched categories:", categoriesData);

  // Build the expense payload with a stable object.
  const expenseData = useMemo(() => {
    return {
      title,
      description,
      amount: Number(amount),
      category_id: categoryId ? Number(categoryId) : null,
      isRecurring,
    };
  }, [title, description, amount, categoryId, isRecurring]);

  // Determine the endpoint and HTTP method based on if we're updating or creating.
  const endpoint = expense
    ? `http://localhost:5000/api/expenses/${expense.ID}`
    : "http://localhost:5000/api/expenses";
  const method = expense ? "PATCH" : "POST";

  // Set up a fetch hook for submission; autoFetch is disabled.
  const { loading, error, refetch } = useFetch(
    endpoint,
    {
      method,
      headers: { "Content-Type": "application/json" },
    },
    false
  );

  // When editing, update local state if the expense prop changes.
  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setCategoryId(expense?.category?.ID || "");
      setIsRecurring(expense.is_recurring);
    }
  }, [expense]);

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense Data Submitted: ", expenseData);

    try {
      await refetch({
        body: JSON.stringify(expenseData),
      });
      // Notify the parent that the expense was saved.
      onExpenseSaved();
      // Clear form fields if creating new. For updating, you might want to keep values.
      if (!expense) {
        setTitle("");
        setDescription("");
        setAmount("");
        setCategoryId("");
        setIsRecurring(true);
      }
    } catch (err) {
      console.error("Error submitting expense:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {expense ? "Update Expense" : "Create Expense"}
      </h2>

      {/* Title Field */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-1 font-semibold text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter expense title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-1 font-semibold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter expense description"
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      {/* Amount Field */}
      <div className="mb-6">
        <label
          htmlFor="amount"
          className="block mb-1 font-semibold text-gray-700"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter expense amount"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Field */}
      <div className="mb-6">
        <label
          htmlFor="category"
          className="block mb-1 font-semibold text-gray-700"
        >
          Category <span className="text-sm text-gray-500">(optional)</span>
        </label>
        {categoriesLoading ? (
          <p>Loading categories...</p>
        ) : categoryError ? (
          <p className="text-red-500">Error loading categories</p>
        ) : categoriesData &&
          Array.isArray(categoriesData) &&
          categoriesData.length > 0 ? (
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            {categoriesData.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.name}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-500">No categories exist</p>
        )}
      </div>

      {/* Recurring Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          id="isRecurring"
          type="checkbox"
          checked={isRecurring}
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="isRecurring" className="text-gray-700">
          Recurring (Fasta utgifter)
        </label>
      </div>

      {/* Feedback for Loading/Error during submission */}
      {loading && (
        <p className="mb-4 text-blue-500">
          {expense ? "Updating Expense..." : "Submitting Expense..."}
        </p>
      )}
      {error && <p className="mb-4 text-red-500">Error: {error.message}</p>}

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        {expense ? "Update Expense" : "Create Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
