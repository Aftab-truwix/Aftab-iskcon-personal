import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Border1 from "../assets/section1border1.webp";
import Border2 from "../assets/section1border2.webp";
import { DonationCartContext } from "../Context/DonationCartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DonateFormModal from "../Components/DonateFormModal";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
const backend = import.meta.env.VITE_BACKEND_URL;

const TempleConstruction = () => {
  const [csrDonation, setCsrDonation] = useState([]);
   const [selectedDonationId, setSelectedDonationId] = useState(null)
    const backend = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const templeDonation = [
    { _id: 1, title: "5 CFT Sand", price: 300 },
    { _id: 2, title: "10 CFT Sand", price: 500 },
    { _id: 3, title: "20 CFT Sand", price: 1000 },
    { _id: 4, title: "300 Bricks", price: 2100 },
    { _id: 5, title: "10 Bag Cement", price: 4000 },
    { _id: 6, title: "100 Kg TMT Saria", price: 5100 },
    { _id: 7, title: "1 Sq. Foot Area", price: 9999 },
    { _id: 8, title: "1 Bag Cement", price: 400 },
    { _id: 9, title: "100 Bricks", price: 750 },
    { _id: 10, title: "4 Bag Cement", price: 1600 },
    { _id: 11, title: "500 Bricks", price: 3500 },
    { _id: 12, title: "Half Sq. Foot Area", price: 4999 },
    { _id: 13, title: "1000 Bricks", price: 7000 },
    { _id: 14, title: "2 Sq. Feet Area", price: 19999 },
  ];

  const {
    addToDonationCart,
    donationCartItems,
    getDonationCartTotal,
    removeFromDonationCart,
    clearDonationCart,
  } = useContext(DonationCartContext);

  async function fetchCSRDonation() {
    try {
      const response = await axios.get(`${backend}/admin/csrdonation`);
      setCsrDonation(response.data);
    } catch (error) {
      console.log("Error while fetching CSRDonation", error);
    }
  }

  useEffect(() => {
    fetchCSRDonation();
  }, []);

  function handleAddToDonationCart(donationType) {
    const isInCart2 = donationCartItems.find(
      (item) => item.id === donationType._id
    );

    if (!isInCart2) {
      addToDonationCart({
        id: donationType._id,
        title: donationType.title,
        amount: donationType.price,
        quantity: 1,
      });
      toast.dismiss();
      toast.success("Donation Added to cart !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.dismiss();
      toast.error("Donation Already in Cart!");
    }
  }

  return (
    <>
      <div className="w-full h-full bg-[#fde3b6] pt-4 px-4 md:px-20">
        <div className="relative z-50">
        <Navbar />

        </div>
        <div className="w-full h-full flex flex-col mt-10 px-4 md:px-10">
          {csrDonation.slice(2, 3).map((donation, index) => {
            // Calculate the percentage of amount raised
            const percentageRaised = Math.round(
              (donation.amountRaised / donation.totalAmount) * 100
            );

            // Data for the pie chart
            const pieChartData = {
              labels: ["Amount Raised", "Remaining Amount"],
              datasets: [
                {
                  data: [
                    donation.amountRaised,
                    donation.totalAmount - donation.amountRaised,
                  ],
                  backgroundColor: ["#f97316", "#36A2EB"],
                  hoverBackgroundColor: ["#f97316", "#36A2EB"],
                },
              ],
            };

            return (
              <div key={index} className="w-full h-full flex flex-col">
                {/* Image */}
                <LazyLoadImage
                  src={donation.image}
                  alt="Lazy Loaded"
                  effect="blur" 
                  className="w-full h-[500px] object-cover  rounded-xl"
                />

                {/* Title */}
                <h1 className="text-[16px] font-[400] font-nunito mt-2">
                  {donation.title}
                </h1>

                {/* Amount Raised */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-gray-900 font-bold flex items-center">
                    ₹{donation.amountRaised.toLocaleString()}
                    <span className="text-gray-600 text-sm pl-2">Raised</span>
                  </p>
                  <div className="flex justify-end mt-1 text-sm text-gray-600">
                    {percentageRaised}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-1.5 mt-2 bg-gray-200 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-1.5 bg-orange-500 rounded-full"
                    style={{
                      width: `${percentageRaised}%`,
                    }}
                  ></div>
                </div>

                <button onClick={() => {setIsModalOpen(true);setSelectedDonationId(donation._id)}} className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full flex justify-center items-center">
                  Donate Now
                </button>
                <DonateFormModal isOpen={isModalOpen} selectedDonationId={selectedDonationId} onClose={() => {setIsModalOpen(false);setSelectedDonationId(null)}} />

                <div className="w-full h-auto flex flex-col py-20">
                  {/* {donation?.map((donation, index) => (
                            <div key={index} className="w-full h-auto flex flex-col my-4 gap-2">
                              <h1 className="my-4 lg:my-6 w-full h-auto text-lg text-center text-[#444444] sm:text-xl font-nunito xl:text-2xl font-semibold">
                                {donation.title}
                              </h1> */}
                  <div className="w-full h-auto flex flex-wrap gap-6 justify-center items-center">
                    {templeDonation?.map((donationType, index) => (
                      <div
                        key={index}
                        className="w-[300px] h-72 rounded-full flex justify-center items-center relative 2xl:h-80 2xl:w-[320px]"
                      >
                        <div className="w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center">
                          <div className="w-full h-full flex flex-col justify-center items-center relative py-3 gap-3 2xl:py-8 z-20">
                            <div className="w-full h-auto flex flex-col justify-center items-center gap-2 xl:gap-3">
                              <h1 className="text-center font-bold font-nunito text-lg xl:text-xl px-7">
                                {donationType.title}
                              </h1>
                              <div className="text-lg text-[#ECA242] xl:text-xl font-semibold">
                                ₹ {donationType.price}
                              </div>
                              <div className="w-full h-auto flex justify-center items-center">
                                <button
                                  className="px-6 py-2 text-white bg-[#EB852C] rounded-3xl md:hover:bg-[#f0913e]"
                                  onClick={() =>
                                    handleAddToDonationCart(donationType)
                                  }
                                >
                                  Donate Now
                                </button>
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
                          // style={{
                          //   transform: `rotate(${scrollY}deg)`, // Spins the image
                          //   transition: "transform 5s linear",
                          // }}
                        />
                      </div>
                    ))}
                  </div>
                  {/* </div>
                          ))} */}
                </div>

                {/* Pie Chart */}
                {/* <div className="mt-6 flex justify-center">
                  <div className="w-[300px] md:w-[450px] h-[300px] md:h-[450px]">
                    <Pie
                      data={pieChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                          },
                          tooltip: {
                            callbacks: {
                              label: (context) => {
                                const label = context.label || "";
                                const value = context.raw || 0;
                                return `${label}: ₹${value.toLocaleString()}`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TempleConstruction;
