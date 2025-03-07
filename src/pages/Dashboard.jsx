import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import "../index.css";
import { IoMdAddCircle } from "react-icons/io";
import { SiBookmyshow } from "react-icons/si";
import { PiReadCvLogoBold } from "react-icons/pi";
export default function Dashboard() {
  const { user } = useContext(AuthContext);
    
  return (
    <div className=" flex md:flex-row flex-col  w-11/12 mx-auto  ">
      <aside className="flex md:flex-col  flex-row border-x asideShadow p-6 md:w-52 lg:w-60 w-full md:h-full h-32 mt-6 justify-between  bg-card text-primary my-1">
        <div className="md:border-b border-b-0 md:border-r-0 border-r md:pb-6 pb-0  mr-2 md:mr-0 flex flex-col border-primary items-center justify-center">
          <img
            src={
              user?.photoURL
                ? user.photoURL
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
        <div className="hidden text-xl font-normal text-primary md:flex flex-row md:flex-col gap-2 mt-6">
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
            My Marathon
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activeBg" : ""
            }
            to={"my-apply-list"}
          >
            My Apply
          </NavLink>
        </div>
        <div className="text-4xl font-normal text-primary flex md:hidden flex-row justify-between gap-9 items-center">
          <NavLink
            className={ ({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "activeBg" : "" 
            }
            title="Add Marathon"
            to={"add-marathon"}
          >
            <IoMdAddCircle className="my-7" />
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
               isPending ? "pending" : isActive ? "activeBg" : "" 
            }
            title="My Marathon"
            to={"my-marathon"}
          >
            <SiBookmyshow className="my-7" />
          </NavLink>
          <NavLink
            className={({ isActive, isPending }) =>
               isPending ? "pending" : isActive ? "activeBg" : "" 
            }
            to={"my-apply-list"}
            title="My Application"
          >
            <PiReadCvLogoBold className="my-7" />
          </NavLink>
        </div>
      </aside>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
