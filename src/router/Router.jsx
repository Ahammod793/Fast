import React, { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../accessPages/Login";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Main from "../components/Main";
import Register from "../accessPages/Register";
import PrivateAuthentication from "../Auth/PrivateAuthentication";
import Dashboard from "../pages/Dashboard";
import AddMarathon from "../components/DashBoardCompo/AddMarathon";
import MyMarathonList from "../components/DashBoardCompo/MyMarathonList";
import MyApplyList from "../components/DashBoardCompo/MyApplyList";
import MarathonDetails from "../pages/marathonUtilities/MarathonDetails";
import Marathon from "../pages/marathonUtilities/Marathon";
import MarathonRegistration from "../pages/marathonUtilities/MarathonRegistration";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: () =>
          fetch(`https://fast-backend-two.vercel.app/marathons/home`),
      },
      {
        path: "/marathon",
        element: (
          <PrivateAuthentication>
            <Marathon />
          </PrivateAuthentication>
        ),
        // loader: () => fetch(`https://fast-backend-two.vercel.app/all-marathons`),
      },
      {
        path: "/marathon-details/:id",
        element: (
          <PrivateAuthentication>
            <MarathonDetails />
          </PrivateAuthentication>
        ),
        loader: ({ params }) =>
          fetch(`https://fast-backend-two.vercel.app/marathons/${params.id}`),
      },
      {
        path: "/register-to-marathon/:id",
        element: (
          <PrivateAuthentication>
            <MarathonRegistration />
          </PrivateAuthentication>
        ),
        loader: ({ params }) =>
          fetch(`https://fast-backend-two.vercel.app/marathons/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateAuthentication>
            <Dashboard />
          </PrivateAuthentication>
        ),
        children: [
          { index: true, element: <Navigate to="add-marathon" replace /> },
          { path: "add-marathon", element: <AddMarathon /> },
          { path: "my-marathon", element: <MyMarathonList /> },
          { path: "my-apply-list", element: <MyApplyList /> },
        ],
      },
    ],
  },
]);
