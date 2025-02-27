import React from "react";
import blueCross from "../assets/blueCross.jpg";
import dubai from "../assets/dubai.jpg";
import fitbit from "../assets/fitbit.jpg";
import ford from "../assets/ford.jpg";
import fruitSnacks from "../assets/fruitSnacks.jpg";
import herbalife from "../assets/herbalife.jpg";
import hunny from "../assets/hunny.jpg";
import maritto from "../assets/maritto.jpg";
import masterCard from "../assets/masterCard.jpg";
import mikeSport from "../assets/mikeSport.jpg";
import newBalance from "../assets/newBalance.jpg"; 
import "../index.css"; 
import Marquee from "react-fast-marquee";

export default function Sponsors() {
  const imgList = [
    blueCross,
    dubai,
    fitbit,
    fruitSnacks,
    ford,
    herbalife,
    maritto,
    hunny,
    masterCard,
    mikeSport,
    newBalance,
     
  ];

  return (
    <Marquee direction="right"   speed={60}   gradientWidth={100} gradient gradientColor="#01172a"
      className="  flex h-[220px] bg-gradient-to-r from-[#0f172a] to-[#f3fef2] items-center justify-between ">
      {imgList.map((img, index) => (
        <div
          key={index}
          className="sponsor-box m-2"
          style={{
            animationDelay: `${index+1}s`,  
          }}
        >
          <img src={img} alt={`Sponsor ${index + 1}`} />
        </div>
      ))}
    </Marquee>
  );
}
