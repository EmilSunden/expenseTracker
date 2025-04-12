// src/pages/CategoryOverviewPage.jsx
import React, { useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import CategoryList from "../components/Categories/CategoryList";

const CategoryOverviewPage = () => {
  const options = useMemo(() => ({}), []);

  // Fetch the list of categories.
  // Adjust this according to what your endpoint returns (array vs. { categories: [...] })
  const { data, error, loading, refetch } = useFetch(
    "http://localhost:5000/api/categories",
    options,
    true
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Categories Overview</h1>
      {loading && <p className="text-blue-500">Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && Array.isArray(data) && data.length > 0 ? (
        <CategoryList categories={data} />
      ) : (
        !loading && <p className="text-gray-500">No categories found.</p>
      )}
    </div>
  );
};

export default CategoryOverviewPage;
