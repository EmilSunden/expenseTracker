import React from "react";
import { useFetch } from "../hooks/useFetch";

const GetExpenses = () => {
  const options = React.useMemo(() => ({}), []);
  const { data, error, loading } = useFetch(
    "http://localhost:5000/api/expenses/get",
    options,
    true // autoFetch is enabled
  );

  console.log("Data:", data);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.expenses && (
        <ul>
          {data.expenses.map((expense) => (
            <li key={expense.ID}>{expense.category?.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetExpenses;
