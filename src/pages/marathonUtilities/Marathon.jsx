import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../../index.css";
import MarathonCard from "./MarathonCard";
import useAxios from "../../Auth/AxiosProvider";
import { AuthContext } from "../../Auth/AuthProvider";
import Loading from "../../Components/Loading";

export default function Marathon() {
  const axiosHook = useAxios();
  // const data = useLoaderData();
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    axiosHook.get("/marathons").then((res) =>{
      setData(res.data)
      setIsLoaded(true)

  });
  }, []);

  return (
    <div className="w-11/12 mx-auto text-primary">
      <div className="grid grid-cols-3 gap-4">
      {isLoaded ?
      data.map((marathon, index) => (
        <MarathonCard key={index} marathon={marathon} />
      ))
      : <div>
        <Loading />
      </div>
      }
      </div>
    </div>
  );
}
