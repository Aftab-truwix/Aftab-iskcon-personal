import React, { useEffect, useState } from "react";
import Image from "../assets/signUpImage.webp";
import Logo from "../assets/logo.svg";
import PhoneInput from "react-phone-input-2"; // Import the library
import "react-phone-input-2/lib/style.css"; // Import the library's CSS
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const backend = import.meta.env.VITE_BACKEND_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function SignInPage() {
  const [signInWay, setSignInWay] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousal = [
    {
      id: 1,
      image: Image,
      title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`,
    },
    {
      id: 2,
      image: Image,
      title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`,
    },
    {
      id: 3,
      image: Image,
      title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`,
    },
    {
      id: 4,
      image: Image,
      title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`,
    },
  ];

  const resetFormData = () => {
    setUserDetails({
      name: "",
      email: "",
      phone_no: "",
      password: "",
    });
  };

  const navigate = useNavigate();

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carousal.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [carousal.length]);

  async function handleSignIn() {
    // Validation
    // if (!userDetails.name.trim()) {
    //     alert("Name is required");
    //     return;
    // }

    if (signInWay === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!userDetails.email || !emailRegex.test(userDetails.email)) {
        alert("Please enter a valid email address");
        return;
      }
    } else if (signInWay === "phone") {
      // If using phone, check if the phone number is not empty and properly formatted
      if (!userDetails.phone_no || userDetails.phone_no.length < 10) {
        alert("Please enter a valid phone number");
        return;
      }
    }

    if (!userDetails.password) {
      alert("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        `${backend}/secure/login`,
        userDetails,
        { withCredentials: true }
      );
      // console.log("response",response.data)
      if (response.status === 200 || response.status === 201) {
        alert("User successfully logged in");
        setUserDetails({
          // name: '',
          email: "",
          phone_no: "",
          password: "",
        });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      }
    } catch (error) {
      console.log("Error while Login user", error);
      alert(error.response.data.message);
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleLoginSuccess = async (response) => {
    const idToken = response.credential;
    console.log("ID token:", idToken);
    try {
      const res = await axios.post(`${backend}/secure/google-auth`, {
        idToken,
      });

      console.log(res.data);
      console.log(res.data.data.token);
      if (res.data.statusCode === 200) {
        localStorage.setItem("token", JSON.stringify(res.data.data.token));

        navigate("/");
      }
    } catch (error) {
      console.error("Error sending ID token to backend:", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login failed:", error);
  };
  return (
    <div className="w-full h-auto flex flex-col mt-10 gap-8 md:flex-row-reverse md:mt-0">
      <div className="w-full h-auto flex flex-col gap-14 px-5 lg:px-10 xl:px-20 sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] lg:my-10">
        <Link to="/" className="w-full h-auto flex justify-center items-center">
          <img
            src={Logo}
            alt="iskcon Logo"
            className="w-32 h-auto object-cover"
          />
        </Link>
        <div className="w-full h-auto flex flex-col font-nunito">
          <h1 className="font-semibold text-lg lg:text-xl">Sign In</h1>
          <p className="text-sm font-semibold my-3 lg:my-4">
            Welcome Back, Log in to manage your shipments and clients
            effortlessly.
          </p>
          <div className="w-full h-auto flex flex-col gap-4 lg:flex-row ">
            <button
              onClick={() => {
                setSignInWay("email");
                resetFormData();
              }}
              className={`${
                signInWay === "email" ? "border-[#ECA242]" : "border-black"
              } px-6 py-1 rounded-3xl bg-white border lg:py-2`}
            >
              Sign In via Email
            </button>
            <button
              onClick={() => {
                setSignInWay("phone");
                resetFormData();
              }}
              className={`${
                signInWay === "phone" ? "border-[#ECA242]" : "border-black"
              } px-6 py-1 rounded-3xl bg-white border lg:py-2`}
            >
              Sign In via Mobile Number
            </button>
          </div>
          <div className="w-full h-auto flex flex-col my-5 gap-4 lg:my-7 lg:gap-6">
            {/* <input type="text" placeholder='Name' onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} value={userDetails.name} className='w-full h-auto px-3 border border-black rounded-3xl py-2' /> */}
            {signInWay === "email" ? (
              <input
                type="email"
                placeholder="Email Address"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                className="w-full h-auto px-3 border border-black rounded-3xl py-2"
              />
            ) : (
              <PhoneInput
                country={"in"} // Default country
                value={userDetails.phone_no}
                onChange={(phone) =>
                  setUserDetails({ ...userDetails, phone_no: phone })
                }
                placeholder="Phone Number"
                inputClass="!w-full !h-10 !pl-[60px] !rounded-3xl !border !border-black" // Tailwind styles
                dropdownClass="!rounded-lg !shadow-lg !ml-60 !mt-72" // Tailwind styles for dropdown
                containerClass="!w-full !rounded-l-3xl" // Tailwind styles for container
                buttonClass="!bg-white !h-9 !ml-1 !my-auto !px-2 !flex !items-center !justify-center !rounded-l-3xl !border-none" // Styles for the flag dropdown
              />
            )}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                placeholder="Password"
                className="w-full px-4 py-2 rounded-full border border-black "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <IoMdEyeOff size={20} />
                ) : (
                  <IoMdEye size={20} />
                )}
              </button>
            </div>
            <button
              onClick={handleSignIn}
              className="w-full h-auto py-2 bg-[#EB852C] flex justify-center items-center text-white rounded-3xl"
            >
              Sign In
            </button>
            <p className="w-full h-auto flex justify-end">
              <Link to="/forgot-password" className="text-[#3F3F3F80] text-sm">
                Forgot Password
              </Link>
            </p>
            <div className="w-full h-auto flex justify-center items-center gap-1">
              <span className="text-[#6E6868]">Don't have an account?</span>
              <Link to="/signup" className="text-[#EB852C]">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="w-full h-auto flex items-center justify-center gap-2">
            <span className="w-[30%] h-[1px] bg-gray-400"></span>
            <span className="text-[#999A9C]">Or</span>
            <span className="w-[30%] h-[1px] bg-gray-400"></span>
          </div>
          <div className="w-full flex justify-center ">
            <GoogleOAuthProvider clientId={googleClientId}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                text="Sign Up"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] md:h-full">
        <div className="w-full h-auto flex overflow-hidden relative md:h-full">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {carousal.map((item, index) => (
              <div
                key={index}
                className="min-w-full h-auto relative flex md:h-[750px] lg:h-[840px]"
              >
                <img
                  src={item.image}
                  key={index}
                  alt="item image"
                  className="w-full h-full object-cover"
                />
                <p className="text-[#ECA242] font-poppins text-center px-10 absolute bottom-20 text-lg">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full h-auto flex flex-col absolute bottom-10 gap-7">
            <div className="w-full h-auto flex justify-center items-center">
              {carousal.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 w-3 rounded-full mx-1 ${
                    currentIndex === index ? "bg-[#EB852C]" : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
