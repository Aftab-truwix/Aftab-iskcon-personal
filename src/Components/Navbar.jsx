import logo from "../assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import cart from "../assets/cart.svg";
import { useState, useEffect, useContext } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CartContext } from "../Context/CartContext";
import { DonationCartContext } from "../Context/DonationCartContext";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import logicon from "../assets/enter.webp";
import donation from "../assets/donation.webp";
import { PiBellSimpleZLight } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import sun from "../assets/sun.gif";
import moon from "../assets/moon.gif";
import puja from "../assets/puja.webp";
import { IoNotifications } from "react-icons/io5";
import darshan from "../assets/darshan.svg";
import { useLocation } from "react-router-dom";
import StoryViewer from "../Components/Strory.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartSidebar, setCartSidebar] = useState(false);
  const [donationSidebar, setDonationSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For desktop
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false); // For mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [hasAccessToken, setHasAccessToken] = useState(false);
  const [status, setStatus] = useState({ isOpen: false, timeSlot: "Closed" });
  const [isDayTime, setIsDayTime] = useState(false); // New state for day/night
  const [isOpen, setIsOpen] = useState(false);
  const [donationDropdown, setDonationDropdown] = useState(false);
  const location = useLocation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  const handleDonationClick = () => {
    setDonationDropdown(!donationDropdown);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();

      // Define the open and closed time ranges
      const openingHour = 4;
      const openingMinute = 30;
      const closingHourMorning = 13;
      const closingMinuteMorning = 0;
      const afternoonCloseStart = 13;
      const afternoonCloseEnd = 16;
      const reopeningHour = 16;
      const reopeningMinute = 0;
      const closingHourEvening = 21;
      const closingMinuteEvening = 30;
      const nightCloseStart = 21;
      const nightCloseMinuteStart = 30;
      const nightCloseEnd = 4;
      const nightCloseMinuteEnd = 30;

      // Determine if it's open or closed
      if (
        (currentHour > openingHour ||
          (currentHour === openingHour && currentMinute >= openingMinute)) &&
        (currentHour < closingHourMorning ||
          (currentHour === closingHourMorning &&
            currentMinute <= closingMinuteMorning))
      ) {
        // Open from 04:30 - 13:00
        setStatus({
          isOpen: true,
          timeSlot: "04:30 - 13:00",
        });
        setIsDayTime(true);
      } else if (
        currentHour >= afternoonCloseStart &&
        currentHour < afternoonCloseEnd
      ) {
        // Closed from 13:00 - 16:00
        setStatus({
          isOpen: false,
          timeSlot: "13:00 - 16:00",
        });
        setIsDayTime(true);
      } else if (
        (currentHour > reopeningHour ||
          (currentHour === reopeningHour &&
            currentMinute >= reopeningMinute)) &&
        (currentHour < closingHourEvening ||
          (currentHour === closingHourEvening &&
            currentMinute <= closingMinuteEvening))
      ) {
        // Open from 16:00 - 21:30
        setStatus({
          isOpen: true,
          timeSlot: "16:00 - 21:30",
        });
        setIsDayTime(false);
      } else if (
        currentHour > nightCloseStart ||
        (currentHour === nightCloseStart &&
          currentMinute >= nightCloseMinuteStart) ||
        currentHour < nightCloseEnd ||
        (currentHour === nightCloseEnd && currentMinute <= nightCloseMinuteEnd)
      ) {
        // Closed from 21:30 - 04:30
        setStatus({
          isOpen: false,
          timeSlot: "21:30 - 04:30",
        });
        setIsDayTime(false);
      } else {
        // Default to closed if none of the conditions are met
        setStatus({
          isOpen: false,
          timeSlot: "Closed",
        });
      }
    };

    checkTime();

    const interval = setInterval(checkTime, 60000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Get the token from localStorage
    const accessToken = localStorage.getItem("token");

    // If the token exists and is not null, set the state to true
    if (accessToken) {
      setHasAccessToken(true);
    }
  }, []);

  // console.log(hasAccessToken);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  const { clearCart, removeFromCart, getCartTotal, addToCart, cartItems } =
    useContext(CartContext);

  const {
    donationCartItems,
    addToDonationCart,
    clearDonationCart,
    removeFromDonationCart,
    getDonationCartTotal,
  } = useContext(DonationCartContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (localStorage.getItem("isAuthenticated") === "true")
      localStorage.removeItem("isAuthenticated");
    setHasAccessToken(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if (donationCartItems.length > 0) {
      setDonationSidebar(true);
    } else {
      setDonationSidebar(false);
    }
  }, [donationCartItems]);

  return (
    <>
      {/* Upper Navbar */}
      <div className="w-full flex justify-end z-[100]">
        <div className="flex items-center gap-3">
          <div className="bg-[#ffffff] hidden  rounded-3xl py-3 px-4 lg:flex items-center gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
            <span>
              {status.isOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.5" cy="9.5" r="9.5" fill="#C2FFC2" />
                  <circle cx="9.50006" cy="9.5" r="7.26471" fill="#88F888" />
                  <circle
                    cx="9.49965"
                    cy="9.50002"
                    r="3.91176"
                    fill="#50D850"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="9.5" cy="9.5" r="9.5" fill="#FFC2C2" />
                  <circle cx="9.50006" cy="9.5" r="7.26471" fill="#F88888" />
                  <circle
                    cx="9.49965"
                    cy="9.50002"
                    r="3.91176"
                    fill="#D85050"
                  />
                </svg>
              )}
            </span>

            <p className="text-gray-600 text-sm font-semibold">
              {status.isOpen ? "Open" : "Closed"}
            </p>
            <span>
              <img
                src={isDayTime ? sun : moon}
                alt="status"
                width={20}
                height={20}
              />
            </span>
            <p className="text-gray-600 text-sm font-semibold">
              {status.timeSlot}
            </p>
          </div>

          {/* Live Darshan */}
          <Link
            to={"/live-darshan"}
            className="hidden md:flex items-center bg-[#ffffff] rounded-3xl py-1 px-2 gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="w-9 h-9 flex justify-center rounded-full items-center ">
              <img src={logo} alt="" />
            </span>
            <p className="pr-2 text-gray-600 text-[12px] lg:text-sm font-semibold">
              Live-Darshan
            </p>
          </Link>

          {/* Daily Darshan */}
          <Link
            to={"/daily-darshan"}
            className="hidden md:flex items-center bg-[#ffffff] rounded-3xl py-1 px-1 gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="w-9 h-9 flex justify-center rounded-full items-center bg-[#ffa700]">
              <img src={darshan} alt="" />
            </span>
            <p className="pr-2 text-gray-600 text-[12px] lg:text-sm font-semibold">
              Daily-Darshan
            </p>
          </Link>
          <Link
            to={"/classes"}
            className="hidden md:flex items-center bg-[#ffffff] rounded-3xl py-1 px-1 gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="w-9 h-9 flex justify-center rounded-full items-center bg-[#ffa700]">
              <img src={darshan} alt="" />
            </span>
            <p className="pr-2 text-gray-600 text-[12px] lg:text-sm font-semibold">
              Offline Classes
            </p>
          </Link>

          {/* Schedule */}
          <div
            className="hidden md:flex items-center bg-[#ffffff] rounded-3xl py-1 px-1 gap-2 shadow-[0_1px_5px_rgba(0,0,0,0.5)] cursor-pointer"
            onClick={openModal}
          >
            <span className="w-9 h-9 flex justify-center rounded-full items-center bg-[#ffa700]">
              🗓️
            </span>
            <p className="pr-2 text-gray-600 text-sm font-semibold">Schedule</p>
          </div>

          {/* Notifications */}
          <div
            className="w-auto h-auto relative flex justify-center items-center shadow-[0_1px_5px_rgba(0,0,0,0.5)] rounded-full"
            onClick={() => setIsPopupVisible(true)}
          >
            <span className="cursor-pointer w-10 flex justify-center items-center h-10 rounded-full bg-white">
              <IoNotifications size={25} className="text-[#ffa700]" />
            </span>
            <span className="w-2 h-2 bg-[#fc9191] rounded-full absolute top-0 right-1"></span>
          </div>
          {isPopupVisible && (
            <StoryViewer onClose={() => setIsPopupVisible(false)} />
          )}
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
              onClick={closeModal}
            >
              <div
                className="bg-white rounded-lg shadow-lg p-6 w-[100%] max-w-7xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  <IoIosCloseCircleOutline size={40} />
                </button>

                <h2 className="text-xl font-bold text-center mb-4">
                  ISKCON Wevecity Temple Timings
                </h2>
                <p className="text-center text-gray-600 font-semibold mb-8">
                  Closed from 13:00 - 16:00 and 21:30 - 04:10
                </p>

                <div className="grid grid-cols-3 gap-8">
                  {[
                    {
                      time: "04:30 AM",
                      event: "Mangal Aarti",
                      translation: "मंगल आरती",
                    },
                    {
                      time: "05:00 AM",
                      event: "Tulsi puja",
                      translation: "तुलसी पूजा",
                    },
                    {
                      time: "07:15 AM",
                      event: "Shrinagar Darshan",
                      translation: "श्रीनगर दर्शन",
                    },
                    {
                      time: "07:30 AM",
                      event: "Guru Puja",
                      translation: "गुरु पूजा",
                    },
                    {
                      time: "08:00 AM",
                      event: "Srimad Bhagavatam Class",
                      translation: "श्रीमद भागवतम क्लास",
                    },
                    {
                      time: "12:30 PM",
                      event: "Raj Bhoga Aarti",
                      translation: "राज भोग आरती",
                    },
                    {
                      time: "01:00 PM",
                      event: "Darshan Closed",
                      translation: "दर्शन बंद",
                    },
                    {
                      time: "04:15 PM",
                      event: "Dhoop Aarti",
                      translation: "धूप आरती",
                    },
                    {
                      time: "06:30 PM",
                      event: "Sandhya Aarti",
                      translation: "संध्या आरती",
                    },
                    {
                      time: "07:30 PM",
                      event: "Bhagavad Gita Discourse",
                      translation: "भगवद गीता डिस्कोर्स ",
                    },
                    {
                      time: "08:30 PM",
                      event: "Shayan Aarti",
                      translation: "शयन आरती",
                    },
                    {
                      time: "09:00 PM",
                      event: "Darshan Closed",
                      translation: "दर्शन बंद",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-10 h-10 bg-blue-300 rounded-full flex justify-center items-center">
                        <img
                          src={puja}
                          alt="icon"
                          width={200}
                          height={200}
                          className="w-6 h-6 object-contain"
                        />
                      </span>
                      <div>
                        <p className="font-bold">
                          {item.time} – {item.event}
                        </p>
                        <p className="text-sm text-gray-600">
                          {item.translation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {!hasAccessToken ? (
            <>
              <div>
                <Link
                  to={"/signup"}
                  className="bg-[#eb852c] text-white md:hover:bg-white md:hover:text-[#eb852c] duration-500 ease-in-out text-[10px] lg:text-sm font-semibold rounded-full py-2 md:py-3 px-8 cursor-pointer flex justify-center items-center shadow-[0_1px_5px_rgba(0,0,0,0.5)]"
                >
                  SignUp
                </Link>
              </div>
              <div>
                <Link
                  to={"/signin"}
                  className="bg-[#eb852c] text-white md:hover:bg-white md:hover:text-[#eb852c] duration-500 ease-in-out text-[10px] lg:text-sm font-semibold rounded-full py-2 md:py-3 px-8 cursor-pointer flex justify-center items-center shadow-[0_1px_5px_rgba(0,0,0,0.5)]"
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Lower Navbar */}
      <div
        className="w-full h-[70px] rounded-[100px] pl-6 pr-4 mt-2 z-[100]"
        style={{
          backgroundColor: "rgba(251,247,245,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="w-full h-full flex justify-between items-center">
          <Link
            to="/"
            className="flex justify-center w-14 items-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <span className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-12 text-base font-medium">
              {[
                { path: "/about", label: "About Us" },
                { path: "/donation", label: "Donation" },
                { path: "/events", label: "Events" },
                { path: "/blogs", label: "Blogs" },
                { path: "/shop", label: "Shop" },
                { path: "/contacts", label: "Contacts" },
              ].map(({ path, label }) =>
                label === "Donation" ? (
                  <li
                    key={path}
                    className="relative group flex items-center gap-2 cursor-pointer"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() =>
                      setTimeout(() => setDropdownOpen(false), 200)
                    }
                  >
                    <span className="flex items-center gap-2 text-black ">
                      {label}
                      <IoIosArrowDown />
                      {dropdownOpen && (
                        <div className="absolute top-6 left-0 w-60 z-50 bg-white shadow-md rounded-xl">
                          <ul className="flex flex-col p-2">
                            <li>
                              <NavLink
                                to="/donation"
                                className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                              >
                                General Donation
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/csr"
                                className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                              >
                                CSR Donation
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/temple-construction"
                                className="block px-4 py-2 rounded-full hover:bg-[#eb852c] hover:text-white"
                              >
                                Temple Construction
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      )}
                    </span>
                  </li>
                ) : (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-2 ${
                          isActive
                            ? "text-[#eb852c] underline underline-offset-8"
                            : "text-black"
                        } hover:text-[#eb852c]`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <button
              onClick={() => setCartSidebar(true)}
              className="text-black hover:text-[#eb852c] relative"
            >
              <img src={cart} alt="cart" />
              {cartItems.length > 0 && (
                <span className="text-[#eb852c] absolute font-semibold -top-1 text-xs -right-2 w-4 h-4 flex justify-center items-center bg-white rounded-full border border-gray-400">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setDonationSidebar(true)}
              className="text-black hover:text-[#eb852c] relative"
            >
              <img src={donation} alt="" className="w-8 h-8" />

              {donationCartItems.length > 0 && (
                <span className="text-[#eb852c] absolute font-semibold -top-1 text-xs -right-2 w-4 h-4 flex justify-center items-center bg-white rounded-full border border-gray-400">
                  {donationCartItems.length}
                </span>
              )}
            </button>
            <div className="flex gap-4">
              <NavLink
                to="/donate"
                className="px-8 py-3 bg-[#eb852c] text-white rounded-[124px] hover:bg-orange-600 transition ease-in-out"
              >
                Donate Now
              </NavLink>
              {hasAccessToken ? (
                <>
                  <div className="relative flex items-center gap-4">
                    <FaUserCircle
                      size={50}
                      color="#eb852c"
                      className="cursor-pointer border-2 border-white rounded-full"
                      onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                      <div
                        className="absolute top-12 right-0 mt-2 w-52 bg-white shadow-lg rounded-lg border"
                        onMouseLeave={toggleDropdown}
                      >
                        <ul className="flex flex-col text-md space-y-1 m-2">
                          <Link
                            to="/profile"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            My Profile
                          </Link>
                          <Link
                            to="/donation-history"
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          >
                            Donation History
                          </Link>
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </span>

          {/* Mobile Menu Button */}
          <div className="w-auto h-auto flex gap-2 items-center lg:hidden">
            <button
              className="lg:hidden text-black text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="relative flex items-center gap-4">
              {hasAccessToken ? (
                <>
                  <FaUserCircle
                    size={50}
                    color="#eb852c"
                    className="cursor-pointer border-2 border-white rounded-full"
                    onClick={toggleDropdown3}
                  />
                  {isDropdownOpen3 && (
                    <div
                      className="absolute top-12 right-0 mt-2 w-52 z-50 bg-white shadow-lg rounded-lg border"
                      onMouseLeave={toggleDropdown3}
                    >
                      <ul className="flex flex-col text-md space-y-1 m-2 ">
                        <Link
                          to="/profile"
                          className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/donation-history"
                          className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                        >
                          Donation History
                        </Link>
                        <li
                          className="px-4 py-2 cursor-pointer hover:bg-[#eb852c] hover:text-white rounded-full transition duration-300"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-[70px] left-0 w-full bg-[#ece4c7] shadow-md p-6 lg:hidden z-50 rounded-3xl mt-4">
              <ul className="flex flex-col items-center gap-6 text-base font-medium">
                {[
                  { path: "/about", label: "About Us" },
                  { path: "/events", label: "Events" },
                  { path: "/blogs", label: "Blogs" },
                  { path: "/shop", label: "Shop" },
                  { path: "/contacts", label: "Contacts" },
                ].map(({ path, label }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "text-[#eb852c] underline-[#eb852c]"
                            : "text-black underline underline-offset-8"
                        } hover:text-[#eb852c]`
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}

                {/* Donation Menu Item with Dropdown */}
                <li className="relative">
                  <span
                    className="text-black cursor-pointer flex items-center gap-2 hover:text-[#eb852c]"
                    onClick={handleDonationClick}
                  >
                    Donation
                    <span>{donationDropdown ? "▲" : "▼"}</span>
                  </span>

                  {donationDropdown && (
                    <ul className="absolute left-1/2 -translate-x-1/2 mt-2 w-[330px] bg-[#ece4c7] shadow-md rounded-lg p-2">
                      {[
                        { path: "/donation", label: "General Donation" },
                        { path: "/csr", label: "CSR Donation" },
                        {
                          path: "/temple-construction",
                          label: "Temple Construction",
                        },
                      ].map(({ path, label }) => (
                        <li key={path}>
                          <NavLink
                            to={path}
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? "text-[#eb852c] font-bold"
                                  : "text-black"
                              } block px-4 py-2 hover:bg-orange-100 rounded-md text-center underline underline-offset-4`
                            }
                            onClick={() => {
                              setDonationDropdown(false);
                              setMenuOpen(false);
                            }}
                          >
                            {label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>

              {/* Cart & Donation Buttons */}
              <div className="flex flex-col gap-4 mt-6">
                <span
                  className="flex items-center justify-center text-black hover:text-[#eb852c]"
                  onClick={() => setCartSidebar(true)}
                >
                  <img src={cart} alt="cart" />
                </span>
                <span
                  className="flex items-center justify-center text-black hover:text-[#eb852c]"
                  onClick={() => setDonationSidebar(true)}
                >
                  <img src={donation} alt="" className="w-8 h-8" />
                </span>
                <NavLink
                  to="/donate"
                  className="px-8 py-3 bg-[#eb852c] text-white text-center rounded-[124px] hover:bg-orange-600 transition ease-in-out"
                  onClick={() => setMenuOpen(false)}
                >
                  Donate Now
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar with Smooth Animation */}
      <div
        className={`fixed inset-y-0 font-poppins z-[100] h-auto overflow-y-scroll right-0 w-[85%] bg-white shadow-lg p-5 transform transition-transform duration-300 ease-in-out md:w-[60%] lg:w-[50%] xl:w-[40%] 
        ${cartSidebar ? "translate-x-0" : "translate-x-full"}`}
        style={{
          scrollbarWidth: "none",
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-600"
          onClick={() => setCartSidebar(false)}
        >
          <IoMdClose size={40} />
        </button>
        <h2 className="text-lg font-bold">Shopping Cart</h2>
        <div className="w-full h-auto flex justify-end items-center my-2">
          <span
            className="flex gap-2 text-red-500 items-center text-sm md:text-base font-semibold cursor-pointer"
            onClick={clearCart}
          >
            Clear Cart
            <RiDeleteBin5Fill size={20} />
          </span>
        </div>
        <div className="w-full flex flex-col h-auto gap-4 my-7">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-2 pb-4 border-b gap-2 sm:gap-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 rounded-lg object-cover sm:w-32 xl:w-40"
                />
                <div className="flex flex-col gap-1 justify-between h-full sm:py-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-semibold sm:text-base xl:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-sm xl:text-base">
                      Category: {item.category}
                    </p>
                    <p className="text-xs font-semibold sm:text-sm xl:text-base">
                      &#x20B9; {item.price * item.quantity}
                    </p>
                  </div>
                  <div className="w-full h-auto flex">
                    <div className="px-2 py-1 flex gap-2 text-xs items-center justify-center bg-[#ECA242] rounded-lg text-white sm:px-3 sm:text-base sm:rounded-xl sm:gap-3 xl:px-4 xl:py-2">
                      <span
                        onClick={() => removeFromCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        -
                      </span>
                      <span className="font-semibold xl:text-lg">
                        {item.quantity}
                      </span>
                      <span
                        onClick={() => addToCart(item)}
                        className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold h-80 flex justify-center items-center">
              Cart is Empty
            </p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="w-full h-auto flex flex-col">
            <div className="w-full h-auto flex gap-2 items-center">
              <input
                type="checkbox"
                className="w-4 h-4"
                id="checkout"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="checkout"
                className={`text-base ${isChecked ? "font-bold" : ""}`} // Apply 'font-bold' if checked
              >
                Checkout as Guest
              </label>
            </div>
            <div className="h-[1px] bg-black w-full mt-1"></div>
            <div className="w-full h-auto flex flex-col mt-4 gap-1.5 md:gap-2">
              <h1 className="font-semibold lg:text-lg xl:text-2xl">
                Order Summary
              </h1>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Total MRP</span>
                <span>&#x20B9; {getCartTotal()}</span>
              </div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>MRP Discount</span>
                <span>&#x20B9; 0000</span>
              </div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Coupon Discount</span>
                <span>&#x20B9; 0000</span>
              </div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span>Shipping Fee</span>
                <span>&#x20B9; 0000</span>
              </div>
              <div className="w-full h-[1px] bg-black"></div>
              <div className="w-full h-auto flex justify-between items-center md:text-lg">
                <span className="font-semibold">Total Amount</span>
                <span>&#x20B9; {getCartTotal()}</span>
              </div>
            </div>

            <div>
              <Link
                to={`/checkout`}
                className="w-full h-auto flex mt-5 lg:mt-7"
              >
                <button className="w-full bg-[#EB852C] rounded-3xl text-white h-auto flex justify-center items-center py-2 md:hover:bg-[#ffab62]">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Donation Sidebar with Smooth Animation */}

      <div
        className={`fixed font-poppins z-[100] h-[180px] flex flex-col overflow-y-scroll scrollbar-hide left-0 bottom-0 w-full bg-white shadow-lg px-6 py-3 transform transition-transform duration-300 ease-in-out  
        ${donationSidebar ? "translate-y-0" : "translate-y-full"}`}
        style={{
          scrollbarWidth: "none",
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-600 hidden md:block"
          onClick={() => setDonationSidebar(false)}
        >
          <IoMdClose size={40} />
        </button>
        <button
          className="absolute top-3 right-3 text-gray-600 md:hidden"
          onClick={() => setDonationSidebar(false)}
        >
          <IoMdClose size={28} />
        </button>
        <div className="w-[90%] md:w-[95%] h-auto flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-3xl font-bold">Donation Cart</h2>

          <span
            className="flex gap-2 text-red-500 items-center text-sm md:text-base font-semibold cursor-pointer"
            onClick={clearDonationCart}
          >
            Clear Cart
            <RiDeleteBin5Fill size={20} />
          </span>
        </div>
        <div className="w-full flex flex-col md:flex-row  gap-10">
          {/* Donation Cart Section */}
          <div
            className="w-full md:w-1/2 flex flex-col gap-2 justify-start items-start overflow-y-auto"
            style={{ maxHeight: "240px" }} // Fixed height for ~4 items
          >
            {donationCartItems.length > 0 ? (
              donationCartItems.map((item) => (
                <div key={item.id} className="w-full flex items-center">
                  <div className="w-full flex flex-col border border-gray-300 rounded-lg p-2">
                    <div className="w-full flex justify-between items-center">
                      <h3 className="w-[50%] md:w-[60%] text-xs font-semibold sm:text-base xl:text-lg">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold w-[20%] md:w-[15%] sm:text-sm xl:text-base">
                        ₹ {item.amount * item.quantity}
                      </p>
                      <div className="w-[20%] h-auto flex justify-end">
                        <div className="px-2 py-1 flex gap-2 text-xs items-center justify-center bg-[#ECA242] rounded-lg text-white sm:px-3 sm:text-base sm:rounded-xl sm:gap-3 xl:px-4 xl:py-1">
                          <span
                            onClick={() => removeFromDonationCart(item)}
                            className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                          >
                            -
                          </span>
                          <span className="font-semibold w-[20px] text-center xl:text-lg">
                            {item.quantity}
                          </span>
                          <span
                            onClick={() => addToDonationCart(item)}
                            className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg font-semibold h-80 ">
                Cart is Empty
              </p>
            )}
          </div>

          {/* Donation Summary & Checkout Section */}
          {donationCartItems.length > 0 && (
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* Checkout as Guest Checkbox */}
              <div className="w-full h-auto flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  id="checkout"
                  checked={isChecked2}
                  onChange={handleCheckboxChange2}
                />
                <label
                  htmlFor="checkout"
                  className={`text-base ${isChecked2 ? "font-bold" : ""}`} // Apply 'font-bold' if checked
                >
                  Checkout as Guest
                </label>
              </div>
              {/* Divider */}
              <div className="h-[1px] bg-gray-400 w-full"></div>

              {/* Donation Summary */}
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold lg:text-lg xl:text-2xl">
                  Donation Summary
                </h1>
                <div className="flex justify-between text-sm sm:text-base md:text-lg">
                  <span>Total Donation</span>
                  <span>&#x20B9; {getDonationCartTotal()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/donation-checkout" className="w-full">
                <button className="w-full bg-[#EB852C] rounded-3xl text-white py-2 hover:bg-[#ffab62] transition">
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop for Cart Sidebar */}
      {cartSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setCartSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
