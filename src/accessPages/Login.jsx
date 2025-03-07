import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { IoLogoGoogle } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom"; // Fix for navigation
import Swal from "sweetalert2"; // Fix for Swal not defined

export default function Login() {
  const {user, setUser, loginWithGoogle, loginWithEmailPass } = useContext(AuthContext);
  const [ResErr, setResErr] = useState(null);
  const formRef = useRef();
  const navigate = useNavigate(); // Fix for navigation
  const location = useLocation(); // Fix for location
  
  // Handle Email & Password Login
  const emailPassLoginHandler = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const email = form.email.value;
    const pass = form.password.value;

    loginWithEmailPass(email, pass)
      .then((res) => {
        setUser(res.user);
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        }).then(() => {
          navigate(location.state?.from || "/"); // Fix: Navigate properly
        });
      })
      .catch((err) => {
        setResErr(err.message); // Fix: Correct error message reference
        console.error(err.message);
      });
  };

  // Handle Google Login
  const googleLogin = () => {
    const now= new Date();
    loginWithGoogle()
      .then((res) => {
        setUser(res.user);
        fetch(`http://localhost:5000/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            { Name : res.user.displayName, Email : res.user.email, ProfilePic : res.user.photoURL, date : now }
          ),
        }).then(res =>  res.json()).then(data => {
          // data
        }).catch(err=>{
          // err
        })
        
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        }).then(() => {
          navigate(location.state?.from || "/"); // Fix: Navigate properly
        });
      })
      .catch((err) => {
        setResErr(err.message); // Fix: Properly display error
        console.error(err.message);
      });
  };

  return (
    <div className="w-11/12 md:max-w-md mx-auto my-8 md:my-16 text-primary">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-card text-secondary border border-primary">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        
        {/* Login Form */}
        <form noValidate className="space-y-6" ref={formRef} onSubmit={emailPassLoginHandler}>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 focus:border-violet-600"
              required
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 focus:border-violet-600"
              required
            />
            <div className="flex justify-end text-xs">
              <a href="#" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600 hover:bg-violet-700"
          >
            Sign in
          </button>
        </form>

        {/* Social Login Section */}
        <div className="flex items-center pt-1 md:pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={googleLogin}
            aria-label="Log in with Google"
            className="p-3 active:border-cyan-400 hover:text-orange-400 border border-primary py-3 shadow-xl w-4/12 rounded-lg flex items-center justify-center"
          >
            <IoLogoGoogle className="text-xl" />
          </button>
        </div>

        {/* Error Message */}
        {ResErr && <p className="text-red-500 text-sm font-light mt-2">{ResErr}</p>}

        {/* Sign Up Link */}
        <p className="text-xs text-center sm:px-6 mt-4">
          Don't have an account?
          <a href="#" rel="noopener noreferrer" className="underline px-1 hover:text-amber-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
