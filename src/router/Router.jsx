import React from "react";
import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../accessPages/Login";
import ErrorPage from "../pages/ErrorPage"; 
import Home from "../pages/Home";
import Main from "../components/Main";
import Marathon from "../pages/Marathon";
import Register from "../accessPages/Register";
import PrivateAuthentication from "../Auth/PrivateAuthentication";
import Dashboard from "../components/Dashboard";
  export const router = createBrowserRouter([
    {
      path:'/',
      element : <Main/>,
      children : [
        {
          path: '/',
          element : <Home/>,errorElement : <ErrorPage/>,
        },
        {
          path: '/marathon', element :<PrivateAuthentication><Marathon/></PrivateAuthentication> 
        },
        {
          path: '/dashboard', element :<PrivateAuthentication><Dashboard/></PrivateAuthentication> 
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
      ]
    },
    
    
  ]);