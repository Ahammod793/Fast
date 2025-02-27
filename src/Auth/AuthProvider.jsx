import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../fireBase/Firebase.config";
import {
  createUserWithEmailAndPassword, 
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [user, setUser] = useState(null);
  const [laoding, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider(); 

  
// console.log(user)
  const loginWithEmailPass = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const newUserWithEmailPass = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
 

  const loginWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };
  
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }
  
  
  const items = {
    user, setUser,
     
    newUserWithEmailPass,
    
    loginWithGoogle,loginWithEmailPass,
    logOut,
    
    laoding, setLoading
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setLoading(false)
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return <AuthContext.Provider value={items}>{children}</AuthContext.Provider>;
}
