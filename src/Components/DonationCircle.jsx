import React, { useEffect, useState } from "react";
import BgOne from "../assets/bg1.webp";
import Border1 from "../assets/section1border1.webp";
import Border2 from "../assets/section1border2.webp";
import c1 from "../assets/c1.webp";
import c2 from "../assets/c2.webp";
import c3 from "../assets/c3.webp";
import c4 from "../assets/c4.webp";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

function DonationCircle() {
  const [scrollY, setScrollY] = useState(0);
  const [donation, setDonation] = useState([]);

  const location = useLocation();

  async function fetchDonation() {
    try {
      const response = await axios.get(`${backend}/admin/donation/get`);
      setDonation(response.data.data);
    } catch (error) {
      console.log("Error while fetching donation", error);
    }
  }

  // Determine background color based on the route
  const getBackgroundColor = () => {
    if (location.pathname === "/donation") {
      return "bg-white"; // Tailwind class for red background
    } else if (
      location.pathname === "/blogs" ||
      location.pathname.includes("/blogs/single-blog") ||
      location.pathname === "/events" ||
      location.pathname.includes("/events/single-event") ||
      location.pathname === "/live-darshan" 
    ) {
      return "bg-[#FDE3B6]"; // Tailwind class for black background
    }
    return "bg-white";
  };

  // Update scrollY value on scroll
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    fetchDonation();
  }, []);

  return (
    <div
      id="section3"
      className={`w-full h-auto flex flex-col ${getBackgroundColor()} px-4 md:px-10 lg:flex-row-reverse 2xl:h-auto`}
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-auto flex flex-col justify-center pt-4 md:pt-20 mt-10 md:mt-0">
        <h1 className="font-prata mb-10 text-[#3B2106] flex justify-center text-3xl  md:text-3xl lg:text-end lg:text-4xl  2xl:text-6xl">
          Donations
        </h1>
        <p className="pb-20 font-nunito flex justify-center text-center text-lg md:text-2xl">
          Transform lives with your contribution towards Society.
        </p>
        <div className="w-full h-auto flex flex-wrap justify-center items-center gap-6 mb-10 overflow-hidden">
          {donation?.map((item, index) => (
            <div
              key={index}
              className="w-[300px] h-72 rounded-full flex justify-center items-center relative 2xl:h-80 2xl:w-[320px]"
            >
              <div className="w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-center items-center relative py-3 gap-3 2xl:py-8">
                  <div className="w-full h-auto flex flex-col justify-center items-center gap-2">
                    <h1 className="w-[80%] text-center font-bold font-nunito text-xl 2xl:text-2xl">
                      {item.title}
                    </h1>
                    <div className="w-full h-auto flex justify-center items-center">
                      <NavLink
                        to={`/donation/single-donation/${item._id}`}
                        className="px-4 py-2 bg-[#EB852C] md:hover:bg-[#f6ab69] font-nunito rounded-3xl text-white z-30"
                      >
                        View More
                      </NavLink>
                    </div>
                  </div>
                </div>
                <img
                  src={Border2}
                  alt="border 2"
                  className="w-full h-full absolute "
                />
              </div>
              <img
                src={Border1}
                alt="border 1"
                className="w-full h-full absolute"
                style={{
                  transform: `rotate(${scrollY}deg)`, // Spins the image
                  transition: "transform 5s linear",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <div className='w-full h-auto flex justify-center items-center lg:w-[48%] relative overflow-hidden 2xl:w-[40%]'>
                <img src={Krishnaji} alt="krishna" className='w-full h-full sm:h-[600px] object-contain lg:object-cover 2xl:absolute 2xl:-bottom-40 2xl:h-[120%]' />
            </div> */}
    </div>
  );
}

export default DonationCircle;
