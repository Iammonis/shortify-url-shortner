import React, { createContext, useState } from "react";
import { themeValues } from "./theme.js";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(JSON.parse(localStorage.getItem('mode')) || 'light');

  const toggleTheme = () => {
    localStorage.setItem('mode', JSON.stringify(currentTheme === "light" ? "dark" : "light"))
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");
  };

  const value = {
    currentTheme,
    toggleTheme,
    theme: themeValues[currentTheme],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
