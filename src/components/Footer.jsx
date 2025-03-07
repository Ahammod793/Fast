import React from "react";
import { BsDiscord } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { LiaInstagram } from "react-icons/lia";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <div className="bg-footer py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto ">
        <div className="flex flex-col">
          <h1 className="text-primary font-bold text-4xl mb-5">Contuct Info</h1>
          <ul className="text-primary">
            <li className="text-xl italic text-primary pb-1">
              Fast@contact.com
            </li>
            <li className="text-xl italic text-primary pb-2">
              +880 1945-698802
            </li>
            <li>
              <h1 className="text-base font-normal">
                Rajshahi Polytechnic Institute
              </h1>
              <h2 className="text-base font-normar">Shah Monayem Hostel</h2>
              <h2 className="text-base font-normar">Room No. #208</h2>
            </li>
            <li className="flex flex-row gap-8 my-6 ">
              <Link
                className="hover:bg-secondary hover:bg-card text-xl p-1 border-2 border-primary hover:rounded-lg hover:text-[#318890]"
                to="https://www.facebook.com/Ahammodl/"
              >
                <FaFacebook />
              </Link>
              <Link
                className="hover:bg-secondary hover:bg-card text-xl p-1 border-2 border-primary hover:rounded-lg hover:text-[#42bbb5]"
                to="https://t.me/BaabALimam"
              >
                <BsTelegram />
              </Link>
              <Link
                className="hover:bg-secondary hover:bg-card text-xl font-bold p-1 border-2 border-primary hover:rounded-lg hover:text-[#c23c60]"
                to="https://www.instagram.com/ahammod9770/"
              >
                <LiaInstagram />
              </Link>
              <Link
                className="hover:bg-secondary hover:bg-card text-xl p-1 border-2 border-primary hover:rounded-lg hover:text-[#33ac7c]"
                to="https://discord.com/users/1258114332605022310"
              >
                <BsDiscord />
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-primary font-bold text-4xl mb-5">Legal Links</h1>
          <ul className="gap-1 flex flex-col">
            <li className="text-xl   text-primary  ">
              <a className="hover:decoration-dotted hover:underline" href="#">Privacy Policy</a>
            </li>
            <li className="text-xl  text-primary  ">
              <a className="hover:decoration-dotted hover:underline" href="#">Terms & Condition</a>
            </li>
            <li className="text-xl   text-primary ">
              <a className="hover:decoration-dotted hover:underline" href="#">Refund & Cancelation Policy</a>
            </li>
            <li className="text-xl   text-primary ">
              <a className="hover:decoration-dotted hover:underline" href="#">Medical & Safety Guidelines</a>
            </li>
          </ul>
        </div>
        <div className="mt-8">
            <img src={logo ? logo : ''} alt="Fast" className="text-primary text-4xl font-bold" />
        </div>
      </div>
      <div className="border-t-2 border-primary mx-auto w-11/12 mt-4 text-center pt-6">
        <p className="text-primary">All copyrite Reserved &copy;2025</p>
      </div>
    </div>
  );
}
