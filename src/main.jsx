import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Router"; 
import ThemeContext from "./thame/ThameContext";
import AuthProvider from "./Auth/AuthProvider";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContext>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
      
    </ThemeContext>
  </StrictMode>
);
