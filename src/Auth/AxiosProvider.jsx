import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://fast-backend-two.vercel.app",
  withCredentials: true,
});
export default function useAxios() {
//   const navigate = useNavigate();
//   const { logOut } = useContext(AuthContext);
//   useEffect(() => {
//     axiosInstance.interceptors.response.use(
//       (res) => {
//         return res;
//       },
//       (err) => {
//         if (err.response.status === 401 || err.response.status === 403) {
//           logOut().then(navigate("/login"));
//         }
//         return Promise.reject(err);
//       }
//     );
//   }, []);
  return axiosInstance;
}
