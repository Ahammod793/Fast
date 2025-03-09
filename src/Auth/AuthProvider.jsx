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
import axios from "axios";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [TotReg, setTotReg] = useState();

  const googleProvider = new GoogleAuthProvider();

  // console.log(user)
  const loginWithEmailPass = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const newUserWithEmailPass = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const items = {
    user,
    setUser,

    newUserWithEmailPass,

    loginWithGoogle,
    loginWithEmailPass,
    logOut,
    setTotReg,
    TotReg,
    loading,
    setLoading,
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        axios.post(
          "https://fast-backend-two.vercel.app/jwt",
          { email: currentUser.email },
          { withCredentials: true }
        );
      } else {
        axios.post(
          "https://fast-backend-two.vercel.app/logout",
          {},
          {
            withCredentials: true,
          }
        );
      }

      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  return <AuthContext.Provider value={items}>{children}</AuthContext.Provider>;
}
