import React, { useEffect, useState } from "react";
import BgOne from "../../assets/bg1.webp";
import TempleIcon from "../../assets/templeIcon.webp";
import LoveFest from "../../assets/loveFestIcon.webp";
import PhilosphyIcon from "../../assets/philosophyIcon.webp";
import Border1 from "../../assets/section1border1.webp";
import Border2 from "../../assets/section1border2.webp";
import ItemBg from "../../assets/itemBg.webp";
import Krishnaji from "../../assets/krishna2.webp";
import { Link } from "react-router-dom";

function Section1() {
  const [scrollY, setScrollY] = useState(0);

  const content = [
    {
      title: "Temple Schedule",
      icon: TempleIcon,
      desc: "Darshan and Aarti Timings",
    },
    {
      title: "Philosophy",
      icon: PhilosphyIcon,
      desc: "Know ISKCON Philosophy",
    },
    {
      title: "Love Feast",
      icon: LoveFest,
      desc: "Know about Sunday Love Feast",
    },
  ];

  // Update scrollY value on scroll
  // useEffect(() => {
  //     const handleScroll = () => {
  //         setScrollY(window.scrollY);
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //     };
  // }, []);

  return (
    <div
      className="w-full h-auto flex flex-col bg-[#FDE3B6] px-4 md:px-10 lg:flex-row-reverse 2xl:h-screen"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-auto flex flex-col">
        <h1 className="font-prata my-20 text-[#3B2106] sm:text-center md:text-3xl lg:text-end lg:text-4xl sm:text-xl 2xl:text-4xl">
          ISKCON Wave City Temple Construction has <br /> Restarted. Help Us
          Build{" "}
          <span className="text-[#EB852C]">
            Sri Radha Krishna <br /> Temple.
          </span>
        </h1>
        <div className="w-full h-auto flex flex-wrap justify-center items-center gap-6 mb-10 overflow-hidden">
          {content.map((item, index) => (
            <div
              key={index}
              className="w-[300px] h-72 rounded-full flex justify-center items-center relative 2xl:h-80 2xl:w-[320px]"
            >
              <div className="w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center">
                <div className="w-full h-full flex flex-col justify-between relative py-3 gap-3 2xl:py-8 z-50">
                  <div className="w-full h-auto flex flex-col justify-center items-center gap-2">
                    <img
                      src={item.icon}
                      alt="icons"
                      className="mx-auto w-auto h-auto"
                    />
                    <h1 className="text-center font-bold font-nunito text-xl 2xl:text-2xl">
                      {item.title}
                    </h1>
                    <p className="text-center font-nunito text-[#4A5D88] px-4 text-lg 2xl:text-xl">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-full h-auto flex justify-center items-center">
                    <Link to="/csr">
                      <button className="px-4 py-2 bg-[#EB852C] font-nunito rounded-3xl text-white">
                        View More
                      </button>
                    </Link>
                  </div>
                  {/* <img src={ItemBg} alt="border 2" className='w-full h-full absolute ' /> */}
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
      <div className="w-full h-auto flex justify-center items-center lg:w-[48%] relative overflow-hidden 2xl:w-[40%]">
        <img
          src={Krishnaji}
          alt="krishna"
          className="w-full h-full sm:h-[600px] object-contain lg:object-cover 2xl:absolute 2xl:-bottom-40 2xl:h-[120%]"
        />
      </div>
    </div>
  );
}

export default Section1;
