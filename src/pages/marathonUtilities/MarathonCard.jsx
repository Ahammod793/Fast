import React from 'react'
import { Link } from 'react-router-dom'

export default function MarathonCard({marathon}) {
  return (
    <div className="border my-3 p-3 shadow-lg justify-between"  >
    <div className="w-full  flex flex-col justify-center">
      <img
        src={marathon.thumbnail}
        alt=""
        className="border  w-full   lg:h-52 md:h-40 h-36"
      />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-between pt-2">
        <p className="  border border-primary p-2 w-full rounded-r-lg">
          Reg. Start Date <br />
          {marathon.startDate.split("T")[0]}
        </p>
        <p className="  border border-primary p-2 w-full rounded-l-lg text-end">
          Reg. End Date <br />
          {marathon.endDate.split("T")[0]}
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1">
      <h1 className="font-medium text-primary my-2">{marathon.Title}</h1>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-start">Total Reg</h1>
        <p className="text-end">{marathon.TotalReg}</p>
      </div>

      <div className="h-1 w-full my-4 bg-secondary"></div>
      <Link className="w-full py-3 bg-card hover:btn " to={`/marathon-details/${marathon._id}`}>
        <button className="w-full">See Details</button>
      </Link>
    </div>
  </div>
  )
}
