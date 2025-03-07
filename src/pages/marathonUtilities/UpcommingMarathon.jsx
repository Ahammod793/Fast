import React, { useEffect, useState } from 'react'

export default function UpcommingMarathon() {
    const [Data, setData ] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/upcoming-marathon`)
        .then(res => res.json())
        .then(data => {
            setData(data)
        })
    },[])
  return (
    <div className='flex flex-col justify-between'>
        <div className='text-center items-center justify-center '>
            <h1 className='font-bold text-2xl py-4'>Upcoming Marathons</h1>
        </div>
        <div className='grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 items-center w-11/12 mx-auto gap-2 md:gap-4'>
            {
                Data.map((d, index) => 
                    <div key={index} className='w-full  border border-primary items-center p-2 justify-between whitespace-wrap'>
                        <img src={d.image} alt="" className='w-full h-36 md:h-44'/>
                        <div className='bg-pink-400 h-[2px] my-2 '></div>
                        <div className='border border-card p-1 bg-gray-100'>
                            <h1 className='text-xl font-normal border-b pb-2'>{d.name}</h1>
                            <h4 className='font-light text-lg py-2'>Date: {d.date}</h4>
                            <p className='flex text-sm font-light '>{d.highlight}</p>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}
