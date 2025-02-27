import React, { createContext, useState, useEffect } from "react";

export const themeProvider = createContext();
export default function ThemeContext({ children }) {
  const getRunningTheme = () => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      localStorage.setItem("theme", true);
      return true;
    } else {
      return theme ==='true';
    }
  };

  const [theme, setTheme] = useState(getRunningTheme);
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]); 
 
  function themeHundler() {
    setTheme(!theme);
  }

  return (
    <themeProvider.Provider
      value={{
        theme,
        setTheme,
        themeHundler,
      }}
    >
      {children}
    </themeProvider.Provider>
  );
}
