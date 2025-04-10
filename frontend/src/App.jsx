import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import ExpensePage from "./pages/ExpensePage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";

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
          <Route path="/expenses" element={<ExpensePage />} />
          {/* Redirect to home if no route matches */}
          <Route path="*" element={<Home />} />
          {/* The route for the categories page */}
          <Route path="/categories" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
