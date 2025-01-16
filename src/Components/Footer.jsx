import React from "react";
import footerbg from "../assets/footerbg.jpg";
import logof from "../assets/logofooter.svg";
import fb from "../assets/fb.png"
import insta from "../assets/insta.png"
import twit from "../assets/twit.png"

function Footer() {
  return (
    <div
      className="relative w-full h-auto md:h-[580px] px-4 md:px-20 -z-10"
      style={{
        backgroundImage: `url(${footerbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* Blackish overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Content over the overlay */}
      <div className="relative z-10 flex flex-col items-center md:items-start justify-end h-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 my-10 w-full">
          <div className="flex flex-col gap-4 items-center md:items-start text-white w-full md:w-[35%]">
            <img src={logof} alt="" className="w-[200px]" />
            <p className="text-lg w-full text-center md:text-start">
              R-11/35, Hare Krishna Marg,Sector 11,
              <br /> Raj Nagar, Ghaziabad, <br />
              Uttar Pradesh,201002
            </p>
          </div>

          <div className="w-full md:w-[65%] flex flex-col gap-10 md:gap-0 md:flex-row items-center md:items-start justify-between mt-20 mx-auto">
            {/* Timings Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-start">
              <h1 className="text-white font-bold tracking-wider mb-4">
                Timings
              </h1>
              <div className="text-gray-300 space-y-1 md:space-y-2">
                <p>MANGALA ARATI - 04:15 AM</p>
                <p>TULASI-PUJA - 05:00 AM</p>
                <p>SRINGAR DARSHAN - 07:15 AM</p>
                <p>GURU PUJA - 07:25 AM</p>
                <p>BHAGAVATAM CLASS - 08:00 AM</p>
                <p>RAJ BHOG ARATI - 12:30 PM</p>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-start">
              <h1 className="text-white font-bold tracking-wider mb-4">
                Quick Links
              </h1>
              <div className="text-gray-300 space-y-1 md:space-y-2 ">
                <p>About Us</p>
                <p>Donation</p>
                <p>Events</p>
                <p>Blogs</p>
                <p>Shop</p>
                <p>Shop</p>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-start">
              <h1 className="text-white font-bold tracking-wider mb-4">
                Contact Us
              </h1>
              <div className="text-gray-300 space-y-1 md:space-y-2">
                <p>📞 +91 93157 63868</p>
                <p>📞 +91 81309 92863</p>
                <p>📧 info@iskconghaziabad.com</p>
              </div>
              <h2 className="text-white font-bold tracking-wider mt-4">
                Social Links
              </h2>
              <div className="flex gap-6 mt-2">
                <a href="#" className=" ">
                  <span><img src={insta} alt="" className="w-full h-full"/></span>
                </a>
                <a href="#" className=" ">
                  <span><img src={fb} alt="" className="w-full h-full"/></span>
                </a>
                <a href="#" className=" ">
                  <span><img src={twit} alt="" className="w-full h-full"/></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="border-b border-white w-full"></p>
        <div className="w-full flex justify-center text-white my-8">
          ©2025 Copyright by Truwix All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
