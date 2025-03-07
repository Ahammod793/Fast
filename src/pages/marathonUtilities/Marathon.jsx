import React from "react";
import {  useLoaderData } from "react-router-dom";
import "../../index.css";
import MarathonCard from "./MarathonCard";
export default function Marathon() {
  const data = useLoaderData();

  return (
    <div className="w-11/12 mx-auto text-primary">
      
      <div className="grid grid-cols-3 gap-4">
        {data.map((marathon, index) => (
         <MarathonCard key={index} marathon={marathon}/>
        ))}
      </div>
    </div>
  );
}
