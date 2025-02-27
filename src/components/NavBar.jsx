import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FaSun } from "react-icons/fa6";
import { IoIosMoon } from "react-icons/io";
import { themeProvider } from "../thame/ThameContext";
import { NavLink } from "react-router-dom";
import "../index.css";
import { AuthContext } from "../Auth/AuthProvider";
export default function NavBar() {
  const { themeHundler, theme } = useContext(themeProvider);
  const { user,logOut } = useContext(AuthContext);
  const signOut=()=>{
    logOut()  
    .then(() => {
      // console.log('loguot Success')
      setUser(null);
      navigate("/");
    })
    .catch((error) => {
      // An error happened.
    });
  }
  return (
    <nav className="py-4 bg-navbar   text-primary duration-500">
      <div className="container flex justify-between h-8 mx-auto w-11/12 sticky">
        <a
          rel="noopener noreferrer"
          href="#"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={logo} alt="" className="h-14 w-20" />
        </a>
        <ul className="items-stretch hidden space-x-12 md:flex  justify-center">
          <li className="flex flex-row  mt-2">
            <button
              onClick={() => themeHundler()}
              className="w-12 h-6 bg-gray-300  rounded-full flex items-center relative transition-all duration-300 shadow-lg"
            >
              <span
                className={`absolute w-4 h-4 bg-[#a9a524] rounded-full shadow-md transition-all duration-500 ${
                  theme ? "translate-x-1" : "translate-x-7"
                }`}
              ></span>

              <IoIosMoon
                className={`absolute left-[5px] text-gray-900 transition-opacity duration-500 ${
                  theme ? "opacity-0" : "opacity-100"
                } `}
              />
              <FaSun
                className={`absolute right-[5px] text-[#f8812d] transition-opacity duration-500   ${
                  theme ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to="/"
              className="flex items-center  -mb-1"
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to={"/marathon"}
              className="flex items-center -mb-1"
            >
              Marathon
            </NavLink>
          </li>

          <li className="text-center flex">
            <NavLink
              rel="noopener noreferrer"
              to={`${user ? "/dashboard" : "/login"}`}
              className="flex items-center -mb-1"
            >
              {`${user ? "Dashboard" : "Login"}`}
            </NavLink>
          </li>

          {user ? (
           <li className="dropdown dropdown-end">
           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
             <div className="w-10 rounded-full">
               <img
                 alt="Tailwind CSS Navbar component"
                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
             </div>
           </div>
           <ul
             tabIndex={0}
             className="menu menu-sm dropdown-content   rounded-box z-[1] mt-3 w-24 p-2 shadow bg-card text-primary">
             <li>
               <button onClick={signOut} className="justify-between">
               Logout
               </button  >
             </li>
             
           </ul>
         </li>
          ) : (
            <li className="flex">
              <NavLink
                rel="noopener noreferrer"
                to="/register"
                className="flex items-center -mb-1"
              >
                Register
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
