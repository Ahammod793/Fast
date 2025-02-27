import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider"; 
import { MdOutlineErrorOutline } from "react-icons/md";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import Swal from "sweetalert2";
import { auth } from "../fireBase/Firebase.config";
import { updateProfile } from "firebase/auth";

export default function Register() {
  const [invalidInputPass, setInvalidInputPass] = useState(null);
  const [rePassErr, setRePassErr] = useState(null); 
  const [eyeClose, setEyeClose] = useState(true); 
  const { newUserWithEmailPass, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const repeatPassCheck = (e) => {
    const pass = document.querySelector("input[name='floating_password']").value;
    const repeatPass = e.target.value;
    setRePassErr(pass === repeatPass ? null : "Passwords don't match");
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const Fname = form.floating_first_name.value;
    const Lname = form.floating_last_name.value;
    const Email = form.floating_email.value;
    const Pass = form.floating_password.value;
    const RepeatPass = form.repeat_password.value;
    const ProfilePic = form.floating_photoUrl.value;
    const Name = `${Fname} ${Lname}`;
    const isChecked = form.condition.checked;
    const date = new Date(); 
    const userInfo = { Name, Email, ProfilePic, date };
 
    if (Pass !== RepeatPass) {
      setRePassErr("Passwords don't match");
      return;
    }
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(Pass)) {
      setInvalidInputPass("Password must be at least 6 characters with uppercase and lowercase letters.");
      return;
    }
    
    if (!isChecked) {
      return;
    }
   
    try {
      const userResult = await newUserWithEmailPass(Email, Pass);
      const useE = userResult.user;
      setUser(useE);
      
      await fetch(`http://localhost:5000/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      
      await updateProfile(auth.currentUser, {
        displayName: Name,
        photoURL: ProfilePic,
      });
      
      Swal.fire({
        title: "SignUp Success!",
        icon: "success",
        draggable: true,
      }).then(() => {
        navigate(location?.state ? location.state : "/");
      });
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

    return (
      

<form className="max-w-md mx-auto bg-card formContainer my-16" onSubmit={handleSubmit}  >
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
      <label htmFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type={`${eyeClose ? 'password' : 'text'}`} name="floating_password" id="floating_password"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
      <button onClick={()=>setEyeClose(!eyeClose)} className="absolute right-2 top-1/2  transform -translate-y-1 text-primary">{ eyeClose ?  <LiaEyeSlashSolid/>  :<LiaEyeSolid/>  }</button>

     
      <label htmFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>{invalidInputPass && <p className="text-sm text-red-500 font-thin">{invalidInputPass}</p>}
  </div>
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="repeat_password" id="floating_repeat_password" onChange={repeatPassCheck} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
      
      <label htmFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>{rePassErr && <p className="text-sm font-thin text-red-500 inline-flex items-center "> <MdOutlineErrorOutline className="mr-2"/> {rePassErr}  </p>}
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
        <label htmFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
        <label htmFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div className=" md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="url"  name="floating_photoUrl" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
        <label htmFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PhotoUrl </label>
    </div>
    {/* <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2   appearance-none text-primary  border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0   peer" placeholder=" " required />
        <label htmFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
    </div> */}
  </div>
  <div className="flex gap-2 my-2  text-primary font-light text-sm ">
    <input type="checkbox" name="condition" id="" /><p>I agree to the <Link className="hover:text-blue-400" to={'#'}>Terms & Condition</Link></p>
    
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   " >Submit</button>
  <div>
  <p className="font-light text-sm mt-2 text-primary">Already have an account?   <Link to={'/login'} className="text-[#b8ab19] text-lg font-medium hover:underline">Login</Link></p>
  </div>
</form>

    );
  };
    
