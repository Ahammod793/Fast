import React from "react";
import {
    createBrowserRouter,
    Navigate,
  } from "react-router-dom";
import Login from "../accessPages/Login";
import ErrorPage from "../pages/ErrorPage"; 
import Home from "../pages/Home";
import Main from "../components/Main";
import Marathon from "../pages/Marathon";
import Register from "../accessPages/Register";
import PrivateAuthentication from "../Auth/PrivateAuthentication";
import Dashboard from "../pages/Dashboard";
import AddMarathon from "../components/DashBoardCompo/AddMarathon";
import MyMarathonList from "../components/DashBoardCompo/MyMarathonList";
import MyApplyList from "../components/DashBoardCompo/MyApplyList";
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
          path: '/marathon', element :<PrivateAuthentication><Marathon /></PrivateAuthentication> 
        },
        {
          path: '/dashboard',
          element: <PrivateAuthentication><Dashboard /></PrivateAuthentication>,
          children: [
            { index: true, element: <Navigate to="add-marathon" replace /> },  
            { path: 'add-marathon', element: <AddMarathon /> },
            { path: 'my-marathon', element: <MyMarathonList /> },
            { path: 'my-apply', element: <MyApplyList /> }
          ]
        }
      ]
    }
    
    
  ]);