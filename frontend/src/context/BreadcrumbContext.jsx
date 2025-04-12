// src/context/BreadcrumbContext.jsx
import React, { createContext, useState } from "react";

export const BreadcrumbContext = createContext({
  customBreadcrumb: "",
  setCustomBreadcrumb: () => {},
});

export const BreadcrumbProvider = ({ children }) => {
  const [customBreadcrumb, setCustomBreadcrumb] = useState("");

  return (
    <BreadcrumbContext.Provider
      value={{ customBreadcrumb, setCustomBreadcrumb }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};
