import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FaRegistered, FaSun } from "react-icons/fa6";
import { IoIosMoon } from "react-icons/io";
import { themeProvider } from "../thame/ThameContext";
import { Link, NavLink } from "react-router-dom";
import "../index.css";
import { AuthContext } from "../Auth/AuthProvider";
import { AiOutlineHome } from "react-icons/ai"; 
import { MdDashboard, MdLogin, MdOutlineDirectionsRun } from "react-icons/md";
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
    <div className="py-4 bg-navbar text-primary duration-500">
      <div className="container flex justify-between h-8 mx-auto w-11/12 sticky">
        <a
          rel="noopener noreferrer"
          href="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img src={logo} alt="" className="h-14 w-20" />
        </a>
        <ul className="items-stretch space-x-4  md:space-x-12 flex  justify-center">
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
              className="hidden md:flex items-center  -mb-1"
            >
              Home
            </NavLink>
            <NavLink
              rel="noopener noreferrer"
              to="/"
              className="flex md:hidden items-center  -mb-1"
            >
              <AiOutlineHome className="text-2xl"/>
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              rel="noopener noreferrer"
              to={"/marathon"}
              className="hidden md:flex items-center -mb-1"
            >
              Marathon
            </NavLink>
            <NavLink
              rel="noopener noreferrer"
              to={"/marathon"}
              className="flex md:hidden items-center -mb-1"
            >
              <MdOutlineDirectionsRun className="text-2xl"/> 
            </NavLink>
          </li>

          <li className="text-center flex">
            <NavLink
              rel="noopener noreferrer"
              to={`${user ? "/dashboard" : "/login"}`}
              className=" hidden md:flex items-center -mb-1"
            >
              {`${user ? 'Dashboard' : "Login"}`}
            </NavLink>
            <NavLink
              rel="noopener noreferrer"
              to={`${user ? "/dashboard" : "/login"}`}
              className=" flex md:hidden items-center -mb-1"
            >
              {user ? <MdDashboard className="text-2xl"/> :<MdLogin className="text-2xl"/>}
            </NavLink>
            
             
          </li>

          {user ? (
           <li className="dropdown dropdown-end">
           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
             <div className="w-10 rounded-full">
               <img
                 alt="Tailwind CSS Navbar component"
                 src={user.photoURL ? user.photoURL : 'https://i.ibb.co.com/vvpKSdP/download.jpg' } />
             </div>
           </div>
           <ul
             tabIndex={0}
             className="menu menu-sm dropdown-content border border-primary z-[1000]  rounded-box   mt-3  p-2 shadow bg-card text-primary">
             <li className="hover:bg-orange-400">
               <h1>{user?.displayName && user?.displayName}</h1>
             </li>
             <li className="hover:bg-orange-400">
               <p>{user?.email && user?.email}</p>
             </li>
             <li className="hover:bg-orange-400">
               <button onClick={signOut} className="justify-between">
               Logout
               </button  >
             </li>
             
           </ul>
         </li>
          ) : (
            <li className="flex">
             
              <NavLink to="/register" className="hidden md:flex items-center -mb-1">
  Register
</NavLink>
              <NavLink to="/register" className="flex md:hidden text-2xl items-center -mb-1">
              <FaRegistered />
</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
