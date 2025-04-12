import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ExpenseOverviewPage from "./pages/ExpenseOverviewPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import CategoryOverviewPage from "./pages/CategoryOverviewPage.jsx";
import CategoryExpensesPage from "./pages/CategoryExpensesPage.jsx";
import ExpenseFormPage from "./pages/ExpenseFormPage.jsx";
import CategoryFormPage from "./pages/CategoryFormPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* The route for the home page */}
        <Route path="/" element={<MainLayout />}>
          {/* The route for the home page */}
          <Route index element={<Home />} />
          {/* The route for the about page */}
          <Route path="/about" element={<About />} />
          {/* The route for the expenses page */}
          <Route path="/expenses" element={<ExpenseOverviewPage />} />
          <Route path="/expenses/form" element={<ExpenseFormPage />} />

          {/* Redirect to home if no route matches */}
          <Route path="*" element={<Home />} />
          {/* The route for the categories page */}
          <Route path="/categories" element={<CategoryOverviewPage />} />
          <Route path="/categories/add" element={<CategoryFormPage />} />
          {/* The route for the category expenses page */}
          <Route
            path="/categories/:id/expenses"
            element={<CategoryExpensesPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
