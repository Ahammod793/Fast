import React, { useEffect, useState } from "react";
import img1 from "../assets/slide/img1.jpg";
import img2 from "../assets/slide/img2.jpg";
import img3 from "../assets/slide/img3.jpg";

const images = [img1, img2, img3];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    restartAutoSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    restartAutoSlide();
  };
  const restartAutoSlide = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Pause for 5 seconds, then resume auto-slide
  };

  useEffect(() => {
    if (isPaused) return; // If paused, stop auto-slide

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change image every 4 seconds

    return () => clearTimeout(timer); // erage time
  }, [currentIndex, isPaused]);

  const SliderText = [
    <div  className="border-primary border p-3 flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-4xl text-primary">
        🛤️ Run Beyond Limits!
      </h1>
      <p className="font-bold text-2xl text-purple-700">
        📅 Join the Ultimate Marathon Experience –{" "}
        <span className="font-normal text-lg text-primary">
          Sign up today and challenge yourself!
        </span>
      </p>
      <button className="p-2  bg-[#25d3fa] opacity-80 text-primary hover:rounded-lg border border-primary mb-5 mt-3 active:opacity-100">Register</button>
    </div>,
     <div  className="border-primary border p-3 flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-4xl text-primary">
        🎉 Unleash Your Potential!
      </h1>
      <p className="font-bold text-2xl text-purple-700">
        💪 Thousands have crossed the finish line. Now it’s your turn!
      </p>
      <button className="p-2  bg-[#25d3fa] opacity-80 text-primary hover:rounded-lg border border-primary mb-5 mt-3 active:opacity-100">See Past Events</button>
    </div>,
    <div  className="border-primary border p-3 flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-4xl text-primary">
        🏃‍♂️ Ready, Set, Run!
      </h1>
      <p className="font-bold text-2xl text-purple-700">
        🌍 Multiple Locations, Various Distances – Choose your race and start
        training! 
      </p>
      <button className="p-2  bg-[#25d3fa] opacity-80 text-primary hover:rounded-lg border border-primary mb-5 mt-3 active:opacity-100">Explore Events</button>
    </div>
   
  ];

  return (
    <div
      id="default-carousel"
      className="relative w-11/12 mx-auto mt-14"
      data-carousel="slide"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`duration-700 ease-in-out absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              index === currentIndex ? "block" : "hidden"
            }`}
            data-carousel-item
          >
            <img
              src={img}
              className="w-full h-52 md:h-[375px]"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {SliderText.map((text, index)=>(
        <div key={index} onMouseOver={()=>setIsPaused(true)} onMouseLeave={()=>setIsPaused(false)} >
            { (SliderText.indexOf(text)==currentIndex && text)}
        </div>
      ))}
      <div className="absolute z-30 itmes-center justify-center flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full bg-primary text-bg-card text-center `}
            onClick={() => setCurrentIndex(index)}
          >
            o
          </button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center   justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border-primary border">
          <svg
            className="w-4 h-4 text-primary"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-card border-primary border">
          <svg
            className="w-4 h-4 text-primary"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
