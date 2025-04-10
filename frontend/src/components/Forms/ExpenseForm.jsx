// src/components/ExpenseForm.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";

const ExpenseForm = ({ expense, onExpenseSaved }) => {
  // Set up local state for the expense fields
  const [title, setTitle] = useState(expense ? expense.title : "");
  const [description, setDescription] = useState(
    expense ? expense.description : ""
  );
  const [amount, setAmount] = useState(
    expense ? expense.amount.toString() : ""
  );
  // New state for category (store the ID as a string)
  const [categoryId, setCategoryId] = useState(expense?.category?.ID || "");
  const options = useMemo(() => ({}), []);
  // Fetch categories from the endpoint
  // Assuming the endpoint returns an object { categories: [...] }
  const {
    data: categoriesData,
    error: categoryError,
    loading: categoriesLoading,
  } = useFetch("http://localhost:5000/api/categories/get", options, true);
  console.log("Fetched categories:::::", categoriesData);
  // Build the expense payload, including categoryID (or null if not set)
  const expenseData = useMemo(() => {
    return {
      title,
      description,
      amount: Number(amount),
      category_id: categoryId ? Number(categoryId) : null,
    };
  }, [title, description, amount, categoryId]);

  // Determine the endpoint and HTTP method.
  // For update, we expect expense to be provided and use PATCH (and include the expense ID in the URL)
  const endpoint = expense
    ? `http://localhost:5000/api/expense/${expense.ID}/update`
    : "http://localhost:5000/api/expense/add";
  const method = expense ? "PATCH" : "POST";

  // Hook for handling POST/PATCH; autoFetch is disabled and will be triggered manually on submission.
  const { loading, error, refetch } = useFetch(
    endpoint,
    {
      method,
      headers: { "Content-Type": "application/json" },
      // We'll pass in the body on submission
    },
    false
  );

  // When editing, update form fields if the expense prop changes.
  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setCategoryId(expense?.category?.ID || "");
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Expense Data Submitted: ", expenseData);

    // Trigger the POST/PATCH request with the expense data as the body.
    await refetch({
      body: JSON.stringify(expenseData),
    });

    // Notify the parent to refresh the expense list and clear any selected expense.
    onExpenseSaved();

    // If this is a "create" request, clear the form fields.
    if (!expense) {
      setTitle("");
      setDescription("");
      setAmount("");
      setCategoryId("");
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
