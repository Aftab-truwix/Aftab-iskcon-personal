import React, { useState } from "react";
import Circlebg from "../assets/circlebg.webp";
import Navbar from "../Components/Navbar";
import bronge from "../assets/bronze.webp";
import silver from "../assets/silver.webp";
import gold from "../assets/gold.webp";
import diamond from "../assets/diamond.webp";
import platinum from "../assets/platinum.webp";
import Super from "../assets/super.webp";

const MembershipPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardData = [
    {
      id: "bronze",
      title: "Bronze",
      price: "₹ 2,25,555/-",
      facilities: [
        "Name Encriptions On Wall Of Fame",
        "Certificate Of Appreciation",
        "Pandav Sadasyata Card",
        "Prasadam On Your Special Occasions Like Birthday, Anniversary, Etc.",
        "Special Aarti On Special Occasions",
        "ISKCON Life Membership",
        "Dham Yatra Once In A Year (10% Dsicount On Package)",
        "Govinda's Meal Discounts",
        "Festivals Mahaprasadam",
        "Special Invitation For Vigrah Installation",
      ],
      img: bronge,
    },
    {
      id: "silver",
      title: "Silver",
      price: "₹ 5,55,555/-",
      facilities: [
        "Name Encriptions On Wall Of Fame",
        "Certificate Of Appreciation",
        "Token Of Appreciation (In Form Of Silver Coin Encripted With Deities Pics)",
        "Pandav Sadasyata Card",
        "Prasadam On Your Special Occasions Like Birthday, Anniversary, Etc.",
        "Special Aarti On Special Occasions",
        "ISKCON Life Membership",
        "Dham Yatra Once In A Year (15% Dsicount On Package)",
        "VIP Entries During Larged Gathering Festivals",
        "Special Aarti During Rath Yatra For Entire Family",
        "Special Yearly Kirtan At Home",
        "Govinda's Meal Discounts",
        "Festivals Mahaprasadam ( 5% for a Year & Once in a month)",
        "Priority Banquet Hall Booking",
        "Special Invitation For Vigrah Installation",
        "Valet Parking During Festivals",
      ],
      img: silver,
    },
    {
      id: "gold",
      title: "Gold",
      price: "₹ 11,00,000/-",
      facilities: [
        "Name Encriptions On Wall Of Fame",
        "Certificate Of Appreciation",
        "Token Of Appreciation (In Form Of Silver Coin Encripted With Deities Pics)",
        "Pandav Sadasyata Card",
        "Prasadam On Your Special Occasions Like Birthday, Anniversary, Etc.",
        "Special Aarti On Special Occasions",
        "ISKCON Life Membership",
        "Dham Yatra Once In A Year ( 25% Dsicount On Package)",
        "VIP Entries During Larged Gathering Festivals",
        "Special Aarti During Rath Yatra For Entire Family",
        "Complimentary Stay In ISKCON Wave City Guest House ( 7 Days Stay In A Year)",
        "Special Yearly Kirtan At Home",
        "Govinda's Meal Discounts ( 10% for a Year & Once in a month)",
        "Festivals Mahaprasadam",
        "Priority Banquet Hall Booking ( Priority with 5% Discount)",
        "Special Invitation For Vigrah Installation",
        "Valet Parking During Festivals",
      ],
      img: gold,
    },
    {
      id: "diamond",
      title: "Diamond",
      price: "₹ 21,00,000/-",
      facilities: [
        "Name Encriptions On Wall Of Fame",
        "Certificate Of Appreciation",
        "Token Of Appreciation (In Form Of Silver Coin Encripted With Deities Pics)",
        "Pandav Sadasyata Card",
        "Prasadam On Your Special Occasions Like Birthday, Anniversary, Etc.",
        "Special Aarti On Special Occasions",
        "ISKCON Life Membership",
        "Dham Yatra Once In A Year (30% Dsicount On Package)",
        "VIP Entries During Larged Gathering Festivals",
        "Special Aarti During Rath Yatra For Entire Family",
        "Complimentary Stay In ISKCON Wave City Guest House ( 15 Days Stay In A Year)",
        "Special Yearly Kirtan At Home",
        "Govinda's Meal Discounts ( 20% for a Year & Once in a month)",
        "Festivals Mahaprasadam",
        "Priority Banquet Hall Booking ( Priority with 7% Discount)",
        "Special Invitation For Vigrah Installation",
        "Guest of Honors For Vigrah Installation",
        "Special Deities Paraphernalias Like Garlands, Dresses, Etc.",
        "Reserved Seats On Priority In Temple Hall During Grand Festive Ceremony",
        "Valet Parking During Festivals",
      ],
      img: diamond,
    },
    {
      id: "platinum",
      title: "Platinum",
      price: "₹ 31,00,000/-",
      facilities: [
        "Name Encriptions On Wall Of Fame",
        "Certificate Of Appreciation",
        "Token Of Appreciation (In Form Of Silver Coin Encripted With Deities Pics)",
        "Pandav Sadasyata Card",
        "Prasadam On Your Special Occasions Like Birthday, Anniversary, Etc.",
        "Special Aarti On Special Occasions",
        "ISKCON Life Membership",
        "Dham Yatra Once In A Year (50% Dsicount On Package)",
        "VIP Entries During Larged Gathering Festivals",
        "Special Aarti During Rath Yatra For Entire Family",
        "Complimentary Stay In ISKCON Wave City Guest House ( 21 Days Stay In A Year)",
        "Special Yearly Kirtan At Home",
        "Govinda's Meal Discounts ( 30% for a Year & Once in a month)",
        "Festivals Mahaprasadam",
        "Priority Banquet Hall Booking ( Priority with 10% Discount)",
        "Special Invitation For Vigrah Installation",
        "Guest of Honors For Vigrah Installation",
        "Special Deities Paraphernalias Like Garlands, Dresses, Etc.",
        "Reserved Seats On Priority In Temple Hall During Grand Festive Ceremony",
        "Valet Parking During Festivals",
      ],
      img: platinum,
    },
    {
      id: "super",
      title: "Steering Committee Member",
      price: "₹ 51,00,000/-",
      facilities: [
        "Name Encriptions On Wall Of Fame",
        "Certificate Of Appreciation",
        "Token Of Appreciation (In Form Of Silver Coin Encripted With Deities Pics)",
        "Pandav Sadasyata Card",
        "Prasadam On Your Special Occasions Like Birthday, Anniversary, Etc.",
        "Special Aarti On Special Occasions",
        "ISKCON Life Membership",
        "Dham Yatra Once In A Year (50% Dsicount On Package)",
        "VIP Entries During Larged Gathering Festivals",
        "Special Aarti During Rath Yatra For Entire Family",
        "Complimentary Stay In ISKCON Wave City Guest House ( 21 Days Stay In A Year)",
        "Special Yearly Kirtan At Home",
        "Govinda's Meal Discounts ( 30% for a Year & Once in a month)",
        "Festivals Mahaprasadam",
        "Priority Banquet Hall Booking ( Priority with 10% Discount)",
        "Special Invitation For Vigrah Installation",
        "Guest of Honors For Vigrah Installation",
        "Special Deities Paraphernalias Like Garlands, Dresses, Etc.",
        "Reserved Seats On Priority In Temple Hall During Grand Festive Ceremony",
        "Valet Parking During Festivals",
      ],
      note: "Note: This is a special category in which member will become Internal Part of Management for Major Festivities and Events.",
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
      <div className="w-full h-[70px] z-40 absolute top-4 px-4 md:px-20">
        <Navbar />
      </div>
      <div className="w-full absolute top-0 left-1/2 -translate-x-1/2">
        <img src={Circlebg} alt="" className="w-full opacity-10" />
      </div>
      <h1 className="text-2xl md:text-5xl text-center text-[#3b2106] mt-20 font-prata uppercase font-[400px]">
        Membership Categories
      </h1>

      {/* Membership Cards */}
      <div className="w-full px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20 py-20">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`membership-card shiny-${card.id} p-6 rounded-lg text-center font-bold shadow-md h-auto xl:h-[300px] flex flex-col justify-between`}
          >
            <div className="flex justify-center items-center mb-4">
              <img src={card.img} alt={card.title} className="w-20 h-20" />
            </div>
            <h1 className="text-2xl">{card.title}</h1>
            <p className="text-xl tracking-wider">{card.price}</p>
            <div className="my-2 flex flex-col gap-4">
              <button
                onClick={() => handleButtonClick(card)}
                className="bg-white text-black font-semibold py-2 px-4 rounded-full"
              >
                See Facilities
              </button>
              <div class="flex justify-center">
                <a
                  href="#"
                  class="w-full relative flex justify-center items-center px-8 py-1.5 text-xl font-semibold text-white bg-orange-500 rounded-full shadow-md hover:shadow-lg hover:outline hover:outline-offset-4 hover:outline-orange-600 transition-all duration-500"
                >
                  <span class="mr-4">Buy Membership</span>
                  <span class="relative flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      class="w-6 h-6 animate-slide-arrow"
                    >
                      <path
                        d="M12 2L21 12L12 22"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 12H20"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {isPopupOpen && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full ">
            {/* Add max-h and overflow-y-auto */}
            <h2 className="text-2xl font-bold mb-4">{selectedCard.title}</h2>
            <p className="text-lg mb-4">{selectedCard.price}</p>
            <ul className="list-disc pl-5 mb-4 max-h-[60vh] overflow-y-auto hide-scroll">
              {selectedCard.facilities.map((facility, index) => (
                <li key={index} className="text-gray-700">
                  {facility}
                </li>
              ))}
            </ul>
            {selectedCard.note && (
              <p className="text-xl text-gray-500 font-bold text-center mb-4">
                {selectedCard.note}
              </p>
            )}
            <button
              onClick={handleClosePopup}
              className="bg-red-500 text-white font-semibold w-[250px] md:w-[200px] py-2 px-4 rounded-md"
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
