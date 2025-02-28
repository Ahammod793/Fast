import React from "react";
import NavBar from "../components/NavBar";
import Sponsors from "../components/Sponsors";
import Carousal from "../components/Carousal";
import PostEvent from "../components/PostEvent";

export default function Home() {
  return (
    <>
      <header className=" ">
        <Carousal/>
      </header>

      <section className="w-11/12 mx-auto  mt-24">
        <div className="flex items-center justify-center">
          <h1 className="border-x-4 border-t-4  border-primary px-7 font-bold text-3xl text-primary">Our Sponsors</h1>
        </div>
        <Sponsors />
      </section>
      <section>
        <PostEvent/>
      </section>

    </>
  );
}
