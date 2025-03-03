import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.webp";
import about3 from "../assets/about3.webp";
import about4 from "../assets/bout4.webp";

const data = [
  {
    id: "about-srila-prabhupada",
    title: "About Srila Prabhupada",
    image: about1,
  },
  {
    id: "history-of-iskcon",
    title: "History Of ISKCON",
    image: about2,
  },
  {
    id: "our-philosophy",
    title: "Our Philosophy",
    image: about3,
  },
  {
    id: "hare-krishna-movement",
    title: "Hare Krishna Movement",
    image: about4,
  },
];

const AboutUs = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#fde3b6] to-[#f8c56a] w-full min-h-screen">
      <div className="px-4 md:px-20 pt-4 relative z-50">
        <Navbar />
      </div>
      <div className="px-4 md:px-20 animate-slide-in">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-8 font-prata mt-20 animate-fade-in" style={{ lineHeight: "1.4" }}>
            Welcome to <br/> <span className="text-[#b64a07]">ISKCON WaveCity Ghaziabad </span> 
          </h2>
          <p className="text-gray-800 text-lg mb-8 animate-fade-in">
            The ISKCON WaveCity Ghaziabad temple is a divine abode dedicated to the worship of Lord Krishna and His divine associates. It stands as a testament to the vision of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, the Founder-Acharya of the International Society for Krishna Consciousness (ISKCON), who envisioned spreading the teachings of Lord Krishna and the practice of bhakti-yoga to every corner of the world.
          </p>
          <p className="text-gray-800 text-lg mb-8 animate-fade-in">
            Located in the heart of Ghaziabad, this temple is a spiritual oasis for devotees and seekers alike. It serves as a vibrant center for spiritual learning, cultural enrichment, and devotional service. The temple complex is designed to inspire peace, devotion, and a deep connection with the divine.
          </p>
          <p className="text-gray-800 text-lg mb-8 animate-fade-in">
            Whether you are a lifelong devotee or a curious seeker, ISKCON WaveCity Ghaziabad welcomes you to experience the joy of devotion, the wisdom of ancient Vedic teachings, and the warmth of a loving spiritual family. Come and be a part of this divine journey, where every moment is an opportunity to connect with the Supreme Lord, Sri Krishna.
          </p>
        </div>
      </div>
      {/* Cards Section with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 pb-20 px-4 md:px-20 animate-slide-in">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-2xl rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
            onClick={() => handleCardClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl h-[50px] font-bold mb-4 text-center text-[#2c3e50]">
                {item.title}
              </h2>
              <button className="w-full rounded-full mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-2 px-4 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;