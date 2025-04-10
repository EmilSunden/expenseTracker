import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Expenses from "./pages/Expenses.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

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
          <Route path="/expenses" element={<Expenses />} />
          {/* Redirect to home if no route matches */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
