import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "../index.css";
import { themeProvider } from "../thame/ThameContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { AuthContext } from "../Auth/AuthProvider";
export default function Main() {
  const { theme } = useContext(themeProvider);
  const {user, loading} = useContext(AuthContext)
  return (
   <div
    className={`bg-primary text-secondary duration-500 min-h-screen ${
      theme ? "light" : "dark"
    }`}
  >
    <NavBar />
    <Outlet />
    <Footer />
  </div>
  );
}
