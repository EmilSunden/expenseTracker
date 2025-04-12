// src/components/Breadcrumbs.jsx
import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbContext } from "../../context/BreadcrumbContext";

const breadcrumbNameMap = {
  "": "Home",
  categories: "Categories",
  expenses: "Expenses",
};

const Breadcrumbs = () => {
  const location = useLocation();
  const { customBreadcrumb, setCustomBreadcrumb } =
    useContext(BreadcrumbContext);

  // Split the path into segments
  let pathnames = location.pathname.split("/").filter((x) => x);

  // Only remove the numeric segment if we are in the "expenses" view.
  if (
    pathnames[0] === "categories" &&
    pathnames[1] &&
    !isNaN(pathnames[1]) &&
    location.pathname.includes("expenses")
  ) {
    // Remove the numeric ID (the second segment)
    pathnames.splice(1, 1);
  }

  // When we navigate away from a specific category expense view,
  // clear the custom breadcrumb so it won't persist erroneously.
  useEffect(() => {
    // If the pathname doesn't include "expenses", clear the custom breadcrumb.
    if (!location.pathname.includes("expenses")) {
      setCustomBreadcrumb("");
    }
  }, [location.pathname, setCustomBreadcrumb]);

  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="breadcrumb">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          // Build the URL for each breadcrumb
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          // If this is the last segment and a custom breadcrumb exists, use that.
          const name =
            isLast && customBreadcrumb
              ? customBreadcrumb
              : breadcrumbNameMap[value] || value;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="font-semibold text-gray-800">{name}</span>
              ) : (
                <Link to={to} className="text-blue-500 hover:underline">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
