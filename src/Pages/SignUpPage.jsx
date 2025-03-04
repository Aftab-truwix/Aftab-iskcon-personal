import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.webp";
import PhoneInput from "react-phone-input-2"; // Import the library
import "react-phone-input-2/lib/style.css"; // Import the library's CSS
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import Image from "../assets/signUpImage.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
const backend = import.meta.env.VITE_BACKEND_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function SignUpPage() {
  const [signUpWay, setSignUpWay] = useState("email");
  const [otpPopUp, setOtpPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
    user_role: "iskcon-user",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(179); // Timer in seconds (2:59)
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const navigate = useNavigate();

  const resetFormData = () => {
    setUserDetails({
      name: "",
      email: "",
      phone_no: "",
      password: "",
      confirmPassword: "",
      user_role: "iskcon-user",
    });
  };

  useEffect(() => {
    let countdown;

    if (otpPopUp && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable resend when timer hits 0
    }

    return () => clearInterval(countdown); // Cleanup when component unmounts or OTP pop-up closes
  }, [otpPopUp, timer]);

  async function handleVerifyOtp() {
    try {
      if (userDetails.email) {
        const simpleOtp = otp.join("");

        const response = await axios.post(`${backend}/secure/verify-otp`, {
          email: userDetails.email,
          otp: simpleOtp,
        });
        if (response.status === 200 || response.status === 201) {
          toast.success("Email Verified successfully");
          setUserDetails({
            name: "",
            email: "",
            phone_no: "",
            password: "",
            confirmPassword: "",
            user_role: "iskcon-user",
          });
          setTermsCheck(false);
          setOtpPopUp(false);
          navigate("/signin");
        }
      } else {
        const simpleOtp = otp.join("");

        const response = await axios.post(
          `${backend}/secure/verify-otp-mobile`,
          {
            mobileNumber: userDetails.phone_no,
            code: simpleOtp,
          }
        );
        if (response.status === 200 || response.status === 201) {
          toast.success("Mobile Verified successfully");
          setUserDetails({
            name: "",
            email: "",
            phone_no: "",
            password: "",
            confirmPassword: "",
            user_role: "iskcon-user",
          });
          setTermsCheck(false);
          setOtpPopUp(false);
          navigate("/signin");
        }
      }
    } catch (error) {
      console.log("Error while verifying otp", error);
    }
  }

  async function removeUserWithoutVerification() {
    try {
      const response = await axios.delete(`${backend}/secure/user-delete`, {
        data: { email: userDetails.email, phone_no: userDetails.phone_no },
      });

      if (response.status === 200 || response.status === 201) {
        setUserDetails({
          name: "",
          email: "",
          phone_no: "",
          password: "",
          confirmPassword: "",
          user_role: "iskcon-user",
        });
        setTermsCheck(false);
        setOtpPopUp(false);
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      console.log("Error while verifying otp", error);
    }
  }

  async function verifyOtp() {
    try {
      const response = await axios.post(`${backend}/secure/send-otp`, {
        mobileNumber: userDetails.phone_no,
      });

      if (response.status === 200 || response.status === 201) {
        toast.dismiss();
        toast.success("OTP sent successfully");
      }
    } catch (error) {
      console.log("Error while verifying otp", error);
    }
  }

  async function handleSignUp() {
    // Validation
    if (!userDetails.name.trim()) {
      toast.dismiss();
      alert("Name is required");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(userDetails.name.trim())) {
      toast.dismiss();
      toast.error("Name should contain only alphabets and spaces.");
      return;
    }

    if (signUpWay === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!userDetails.email || !emailRegex.test(userDetails.email)) {
        toast.dismiss();
        toast.error("Please enter a valid email address");
        return;
      }
    } else if (signUpWay === "phone") {
      // If using phone, check if the phone number is not empty and properly formatted
      if (!userDetails.phone_no || userDetails.phone_no.length < 10) {
        toast.dismiss();
        toast.error("Please enter a valid phone number");
        return;
      }
    }

    if (!userDetails.password) {
      toast.dismiss();
      toast.error("Password is required");
      return;
    }

    if (userDetails.password.length < 6) {
      toast.dismiss();
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      toast.dismiss();
      toast.error("Password and Confirm Password do not match");
      return;
    }

    // If validation passes, proceed with the signup
    try {
      const response = await axios.post(
        `${backend}/secure/signup`,
        userDetails
      );

      if (response.status === 200 || response.status === 201) {
        if (userDetails.email) {
          setOtpPopUp(true);
          setTimer(179); // Reset timer when OTP popup opens
          setIsResendDisabled(true); // Disable resend initially
        } else {
          toast.dismiss();
          toast.success("Account created successfully");
          setUserDetails({
            name: "",
            email: "",
            phone_no: "",
            password: "",
            confirmPassword: "",
            user_role: "iskcon-user",
          });
          setTermsCheck(false);
          navigate("/signin");
          // verifyOtp()
          // setOtpPopUp(true);
          // setTimer(179); // Reset timer when OTP popup opens
          // setIsResendDisabled(true); // Disable resend initially
        }
      }
      // console.log(response);
      // You can redirect the user or show a success message here
    } catch (error) {
      console.log("Error while registering user", error);
      toast.error(error.response.data.message);
    }
  }

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to the next input if a digit is entered
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle keydown events (e.g., backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move focus to the previous input on backspace
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    // Validate if the pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);

      // Focus on the last input after pasting
      document.getElementById(`otp-input-5`).focus();
    } else {
      alert('Please paste a valid 6-digit OTP.');
    }
  };

  const handleResend = () => {
    setTimer(179);
    setIsResendDisabled(true);
    setOtp(["", "", "", "", "", ""]);
    verifyOtp();
  };
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

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carousal.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [carousal.length]);

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
    <>
      <ToastContainer />

      <div className="w-full h-auto flex flex-col mt-10 gap-8 md:flex-row-reverse md:mt-0">
        <div
          className={`${
            otpPopUp ? "hidden" : "block"
          } w-full h-auto flex flex-col gap-14 px-5 lg:px-10 xl:px-20 sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] lg:my-10`}
        >
          <Link
            to="/"
            className="w-full h-auto flex justify-center items-center"
          >
            <img
              src={Logo}
              alt="iskcon Logo"
              className="w-32 h-auto object-cover"
            />
          </Link>
          <div className="w-full h-auto flex flex-col font-nunito">
            <h1 className="font-semibold text-lg lg:text-xl">Sign Up</h1>
            <p className="text-sm font-semibold my-3 lg:my-4">
              Please enter your email or phone number for verification
            </p>
            <div className="w-full h-auto flex flex-col gap-4 lg:flex-row ">
              <button
                onClick={() => {
                  setSignUpWay("email");
                  resetFormData();
                }}
                className={`${
                  signUpWay === "email" ? "border-[#ECA242]" : "border-black"
                } px-6 py-1 rounded-3xl bg-white border lg:py-2`}
              >
                Sign Up via Email
              </button>
              <button
                onClick={() => {
                  setSignUpWay("phone");
                  resetFormData();
                }}
                className={`${
                  signUpWay === "phone" ? "border-[#ECA242]" : "border-black"
                } px-6 py-1 rounded-3xl bg-white border lg:py-2`}
              >
                Sign Up via Mobile Number
              </button>
            </div>
            <div className="w-full h-auto flex flex-col my-5 gap-4 lg:my-7 lg:gap-6">
              <input
                type="text"
                placeholder="Name"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                className="w-full h-auto px-3 border border-black rounded-3xl py-2"
              />
              {signUpWay === "email" ? (
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
                  placeholder="Phone Number"
                  onChange={(phone) =>
                    setUserDetails({ ...userDetails, phone_no: phone })
                  }
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
              <div className="relative w-full">
                <input
                  type={showPassword2 ? "text" : "password"}
                  value={userDetails.confirmPassword}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 rounded-full border border-black "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword2 ? (
                    <IoMdEyeOff size={20} />
                  ) : (
                    <IoMdEye size={20} />
                  )}
                </button>
              </div>
              <p className="w-full h-auto flex gap-2 items-center text-sm xl:text-base">
                <input
                  type="checkbox"
                  placeholder=""
                  checked={termsCheck}
                  onChange={(e) => setTermsCheck(e.target.checked)}
                  id="termsCondition"
                />
                <label htmlFor="termsCondition">
                  I agree to the Terms and Conditions
                </label>
              </p>
              <button
                onClick={termsCheck ? handleSignUp : null}
                className={`${
                  termsCheck ? "" : "cursor-not-allowed bg-gray-500"
                } w-full h-auto py-2 bg-[#EB852C] flex justify-center items-center text-white rounded-3xl`}
              >
                Sign Up
              </button>
              <div className="w-full h-auto flex justify-center items-center gap-1">
                <span className="text-[#6E6868]">Already have an account?</span>
                <Link to="/signin" className="text-[#EB852C]">
                  Sign In
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
        <div
          className={`${
            otpPopUp ? "block" : "hidden"
          } w-full h-auto font-nunito flex py-48 bg-white px-5 lg:px-10 xl:px-20 sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%]`}
        >
          <div className="w-[90%] h-auto flex flex-col gap-2">
            <div className="w-full h-auto mb-5">
              <FaArrowLeft
                size={25}
                onClick={() => {
                  setOtpPopUp(false);
                  removeUserWithoutVerification();
                }}
                className="text-black cursor-pointer"
              />
            </div>
            <h2 className="text-xl font-semibold">OTP Verification</h2>
            <p className="text-gray-600 text-center mt-2">
              We have sent a message to{" "}
              <span className="font-bold">
                {userDetails.email || userDetails.phone_no}
              </span>
              . Please enter the code to activate your account.
            </p>

            {/* Timer */}
            <p className="text-orange-500 font-bold text-center text-lg my-4">
              {String(Math.floor(timer / 60)).padStart(2, "0")} :{" "}
              {String(timer % 60).padStart(2, "0")}
            </p>

            {/* OTP Input Fields */}
            <div className="flex gap-3 my-4 justify-center items-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  maxLength="1"
                  className="w-12 h-12 border-2 border-gray-300 text-center text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste} // Add paste event handler
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-3xl hover:bg-orange-600 transition"
            >
              Submit
            </button>

            {/* Resend OTP */}
            <p className="text-gray-600 mt-3 text-center">
              Didn’t receive the code?{" "}
              <button
                className={`text-orange-500 font-semibold ${
                  isResendDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:underline"
                }`}
                onClick={handleResend}
                disabled={isResendDisabled}
              >
                Resend OTP
              </button>
            </p>
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
                  className="min-w-full h-auto relative flex md:h-[790px] lg:h-[910px]"
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
    </>
  );
}

export default SignUpPage;
