import React from "react";
import footerbg from "../assets/footerbg.webp";
import logof from "../assets/logofooter.webp";
import fb from "../assets/fb.webp"
import insta from "../assets/insta.webp"
import twit from "../assets/twit.webp"
import { Link, NavLink } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
  return (
    <div
      className="relative w-full h-auto lg:h-[450px] px-4 md:px-20 z-0"
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
        <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start md:gap-10 my-10 w-full">
          <div className="flex flex-col gap-4 items-center lg:items-start text-white w-full md:w-[35%]">
            <img src={logof} alt="" className="w-[200px] relative z-50" />
            <p className="text-base lg:text-lg w-full text-center lg:text-start">
              R-11/35, Hare Krishna Marg,Sector 11,
              <br /> Raj Nagar, Ghaziabad, <br />
              Uttar Pradesh,201002
            </p>
          </div>

          <div className="w-full  md::w-[65%] flex flex-col gap-10 md:gap-0 md:flex-row items-center md:items-start justify-between mt-20 mx-auto">
            {/* Timings Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-start">
              <h1 className="text-white font-bold tracking-wider mb-4">
                Timings
              </h1>
              <div className="text-gray-300 text-sm lg:text-base space-y-1 md:space-y-2">
                <p>MANGALA ARTI - 04:15 AM</p>
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
              <div className="text-gray-300 flex flex-col space-y-1 md:space-y-2 ">
                <NavLink to='/about' className=''>About Us</NavLink>
                <NavLink to='/events' className=''>Events</NavLink>
                <NavLink to='/blogs' className=''>Blogs</NavLink>
                <NavLink to='/shop' className=''>Shop</NavLink>
                <NavLink to='/contacts' className=''>Contact</NavLink>
              </div>
            </div>

            {/* Contact Us Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start text-center md:text-start">
              <h1 className="text-white font-bold tracking-wider mb-4">
                Contact Us
              </h1>
              <div className="text-gray-300 space-y-1 md:space-y-2">
                <p>📞 +91 9990469266</p>
                {/* <p>📞 +91 81309 92863</p> */}
                <p>📧 iskconwavecityg@gmail.com</p>
              </div>
              <h2 className="text-white font-bold tracking-wider mt-4">
                Social Links
              </h2>
              <div className="flex gap-6 mt-4">
                <a href="#" className=" ">
                  <Link to={'https://www.instagram.com/iskconwavecity?igsh=cXF3cnQ3MnMzNHg2'} target="_blank"><FaInstagram color="white" size={40}/></Link>
                </a>
                <a href="#" className=" ">
                  <Link to={'https://www.facebook.com/profile.php?id=61555008819970'} target="_blank"><FaFacebook color="white" size={40}/></Link>
                </a>
                <a href="https://api.whatsapp.com/send?phone=916396075703" target="_blank"  className=" ">
                  <span><IoLogoWhatsapp color="white" size={40} /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="border-b border-white w-full"></p>
        <div className="w-full flex justify-center text-white my-8">
          ©2025 Copyright by Campaigning Source All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
