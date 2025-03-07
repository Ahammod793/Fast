import React from "react";
import Sponsors from "../components/Sponsors";
import Carousal from "../components/Carousal";
import PostEvent from "../components/PostEvent";
import { useLoaderData } from "react-router-dom";
import MarathonCard from "./marathonUtilities/MarathonCard";
import Lottie from "lottie-react";
import Run from "../assets/run.json";
import UpcommingMarathon from "./marathonUtilities/UpcommingMarathon";

export default function Home() {
  const data = useLoaderData();
  return (
    <>
      <header className=" ">
        <Carousal />
      </header>
      <section className="w-11/12 mx-auto my-8 text-primary">
        <div className="flex flex-row gap-5 items-center justify-center">
          <Lottie animationData={Run} loop className="h-36 w-36 p-0 m-0" />
          <h1 className="text-center font-bold text-2xl py-6 relative right-12">Marathon</h1>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {data.map((marathon, index) => (
            <MarathonCard marathon={marathon} key={index} />
          ))}
        </div>
      </section>
      <section>
        <UpcommingMarathon />
      </section>
      <section className="w-11/12 mx-auto  mt-24">
        <div className="flex items-center justify-center">
          <h1 className="border-x-4 border-t-4  border-primary px-7 font-bold text-3xl text-primary">
            Our Sponsors
          </h1>
        </div>
        <Sponsors />
      </section>
      <section className="w-11/12 mx-auto  my-24">
      <div className="text-center flex justify-center ">
        <h1 className="font-bold text-2xl border-x-2 border-green-400 text-center px-4">Peoples Comments</h1>
      </div>
        <PostEvent />
      </section>
    </>
  );
}
