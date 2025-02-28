import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import "../index.css";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-row w-11/12 mx-auto  ">
      <aside className="border-x asideShadow p-6 w-52 bg-card text-primary my-1">
        <div className="border-b pb-6 flex flex-col border-primary items-center justify-center">
          <img
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://i.ibb.co.com/spPgjG4P/OIP.jpg"
            }
            className="w-16 h-16"
          />
          <h1 className="font-medium text-lg items-center">
            {user?.displayName
              ? user?.displayName.split(" ").length >= 2
                ? user?.displayName.split(" ")[1]
                : user?.displayName
              : "Fast"}
          </h1>
        </div>
        <div className="text-xl font-normal text-primary flex flex-col gap-2 mt-6">
          <NavLink
            className={ ({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activeBg" : ""
            }
            to={"add-marathon"}
          >
            Add Marathon
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activeBg" : ""
            }
            to={"my-marathon"}
          >
            My Marathon List
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activeBg" : ""
            }
            to={"my-apply"}
          >
            My Apply List
          </NavLink>
        </div>
      </aside>
      <main className="w-4/6">
        <Outlet />
      </main>
    </div>
  );
}
