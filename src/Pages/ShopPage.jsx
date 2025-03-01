import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Image1 from "../assets/productPage1.svg";
import Image2 from "../assets/freeDeliveryLogo.svg";
import Image3 from "../assets/orderNow.svg";
import Section2 from "../Components/ShopPageComponents/Section2";
import Section3 from "../Components/ShopPageComponents/Section3";
import { useNavigate } from "react-router-dom";

function ShopPage() {

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleClick = () => {
    navigate("/all-products");
  };

  return (
    <>
      <div
                className="w-full h-screen relative"
                style={{
                    backgroundImage: `url(${Image1})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="px-4 md:px-20 pt-4 relative z-50">
          <Navbar />
        </div>
        <div className="w-[95%] sm:w-[80%] lg:w-[74%] 2xl:w-[65%] mt-10 mx-auto gap-8 h-auto flex flex-col py-6 relative sm:mt-20">
          <h1 className="text-center text-3xl md:leading-[50px] lg:leading-[60px] xl:leading-[80px] text-white font-prata font-normal sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Get Srila Prabhupada Books <br />
            Online Now
          </h1>
          <p className="text-white text-sm font-nunito text-center font-thin lg:text-base">
            “By reading my books and chanting Hare Krishna, your life will
            become perfect.”
          </p>
          <div className="w-full h-auto flex justify-center items-center">
            <button
              className="px-5 py-1.5 bg-[#EB852C] text-white rounded-3xl font-normal font-poppins lg:py-3 lg:px-7"
              onClick={handleClick}
            >
              View Products
            </button>
          </div>
          <div className="w-full h-auto flex justify-center items-center">
            <img
              src={Image2}
              alt="free delivery logo"
              className="h-20 w-40 lg:w-60 lg:h-32"
            />
          </div>
          <img
            src={Image3}
            alt="order now"
            className="absolute hidden sm:block sm:top-0 sm:-right-7 sm:w-20 sm:h-20 md:w-24 md:h-24 md:-right-9 md:-top-2 xl:w-28 xl:h-28"
          />
        </div>
      </div>
      <Section2 />
      <Section3 />
    </>
  );
}

export default ShopPage;
