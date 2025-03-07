import React, { useContext, useState } from "react"; 
import { IoLocationSharp } from "react-icons/io5";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Auth/AuthProvider";


export default function MarathonDetails() {
   
  const data = useLoaderData();
  const {
    _id,
    Title,
    startDate,
    endDate,
    marathonDate,
    currentData,
    Location,
    Details,
    thumbnail,
    TotalReg,
    Email,
  } = data;

  
  return (
    <div className=" py-8">
      <div className="lg:w-8/12 md:w-10/12 sm:11/12 flex flex-col mx-auto   p-6 rounded-xl shadow-lg  shadow-slate-900 border border-secondary ">
        <div className="m-3 p-1 rounded-md border border-secondary">
          <h1 className="p-3 bg-blue-500 text-white">Posted: {currentData}</h1>
          <img
            src={thumbnail}
            alt={Title}
            className="border rounded-md w-full h-96"
          />
        </div>
        <div className="box-content m-4">
          <div className="gap-3 grid grid-cols-2">
            <p>
              Reg. Start Date:{" "}
              <span className="font-medium text-lg">
                {startDate.split("T")[0]}
              </span>
            </p>
            <p className="text-end">
              Reg. End Date:{" "}
              <span className="font-medium text-lg">
                {endDate.split("T")[0]}
              </span>{" "}
            </p>
            <p className="my-2">
              Marathon Date:{" "}
              <span className="font-medium text-lg">
                {marathonDate.split("T")[0]}
              </span>{" "}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-secondary">
            <h1 className="font-bold text-start text-2xl text-shadoww  border-secondary mb-6 py-2 border-y-2  ">
              {Title}
            </h1>
          </div>

          <div className="mb-4">
            <p className="text-sm text-secondary leading-6">{Details}</p>
          </div>
          <div className="text-secondary gap-2">
            <h4 className="font-bold text-xl ">
              Creator Mail:{" "}
              <span className=" text-xl font-light ">{Email}</span>
            </h4>
            <h3 className="flex flex-row items-center">
              <IoLocationSharp className="mr-1" />
              <span className="font-bold text-xl">Location:</span>{" "}
              <span className="text-xl font-light ml-6">{Location}</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 text-xl font-thin text-secondary justify-between gap-4 my-4">
            <h2>Total Registration : {TotalReg}</h2>

            <Link 
              className="btn btn-outline  col-span-2 border border-secondary text-primary"
              to={`/register-to-marathon/${_id}`}
            >
              Apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
