import React, { useState } from "react";
import Circlebg from "../assets/circlebg.png";
import Navbar from "../Components/Navbar";
import bronge from "../assets/bronze.svg";
import silver from "../assets/silver.svg";
import gold from "../assets/gold.svg";
import diamond from "../assets/diamond.svg";
import platinum from "../assets/platinum.svg";
import Super from "../assets/super.svg";

const MembershipPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardData = [
    {
      id: "bronze",
      title: "Bronze",
      price: "₹ 2,25,555/-",
      facilities: [
        "Access to community events",
        "Monthly newsletters",
        "Basic membership discounts",
      ],
      img: bronge,
    },
    {
      id: "silver",
      title: "Silver",
      price: "₹ 5,55,555/-",
      facilities: [
        "All Bronze benefits",
        "Priority support",
        "Exclusive event invitations",
      ],
      img: silver,
    },
    {
      id: "gold",
      title: "Gold",
      price: "₹ 11,00,000/-",
      facilities: [
        "All Silver benefits",
        "Annual premium gifts",
        "Free access to premium workshops",
      ],
      img: gold,
    },
    {
      id: "diamond",
      title: "Diamond",
      price: "₹ 21,00,000/-",
      facilities: [
        "All Gold benefits",
        "Lifetime membership",
        "Personalized consultations",
      ],
      img: diamond,
    },
    {
      id: "platinum",
      title: "Platinum",
      price: "₹ 31,00,000/-",
      facilities: [
        "All Diamond benefits",
        "Exclusive retreat invitations",
        "Unlimited event access",
      ],
      img: platinum,
    },
    {
      id: "super",
      title: "Steering Committee Member",
      price: "₹ 51,00,000/-",
      facilities: [
        "All Platinum benefits",
        "VIP access to all events",
        "Special recognition and awards",
      ],
      img: Super,
    },
  ];

  // Open popup with selected card data
  const handleButtonClick = (card) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="bg-[#fde3b6] w-full h-auto relative py-20">
      <div className="w-full h-[70px] z-[100] absolute top-10 px-4 md:px-20">
        <Navbar />
      </div>
      <div className="w-full absolute top-0 left-1/2 -translate-x-1/2">
        <img src={Circlebg} alt="" className="w-full opacity-10" />
      </div>
      <h1 className="text-5xl text-center text-[#3b2106] mt-20 font-prata uppercase font-[400px]">
        Membership Categories
      </h1>

      {/* Membership Cards */}
      <div className="w-full px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-50 py-20">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`membership-card shiny-${card.id} p-6 rounded-lg text-center font-bold shadow-md h-[250px] flex flex-col justify-between`}
          >
            <div className="flex justify-center items-center mb-4">
              <img src={card.img} alt={card.title} className="w-20 h-20" />
            </div>
            <h1 className="text-2xl">{card.title}</h1>
            <p className="text-xl tracking-wider">{card.price}</p>
            <button
              onClick={() => handleButtonClick(card)}
              className="bg-white text-black font-semibold py-2 px-4 rounded-md"
            >
              See Facilities
            </button>
          </div>
        ))}
      </div>

      {/* Popup */}
      {isPopupOpen && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
            <p className="text-lg mb-4">{selectedCard.price}</p>
            <ul className="list-disc pl-5 mb-4">
              {selectedCard.facilities.map((facility, index) => (
                <li key={index} className="text-gray-700">
                  {facility}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClosePopup}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;
