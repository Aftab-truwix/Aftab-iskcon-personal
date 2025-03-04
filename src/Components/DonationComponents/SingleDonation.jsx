import axios from "axios";
import Image1 from "../../assets/bg2.webp";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Border1 from "../../assets/section1border1.webp";
import Border2 from "../../assets/section1border2.webp";
import { DonationCartContext } from "../../Context/DonationCartContext";
import PaymentDetailsCard from "../PaymentDetailsCard";
import { toast } from "react-toastify";

const backend = import.meta.env.VITE_BACKEND_URL;

function SingleDonation() {
  const [singleDonation, setSingleDonation] = useState({});
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [images, setImages] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  const {
    addToDonationCart,
    donationCartItems,
    getDonationCartTotal,
    removeFromDonationCart,
    clearDonationCart,
  } = useContext(DonationCartContext);

  const { id } = useParams();

  async function fetchSingleDonation() {
    try {
      const response = await axios.get(`${backend}/admin/donation/get/${id}`);
      setSingleDonation(response.data.data);
      setImages(response.data.data.image);
    } catch (error) {
      console.log(
        "Error while sending request to fetch single donation",
        error
      );
    }
  }


  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSingleDonation();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && !value.startsWith("0"))) {
      setAmount(value);
    } else {
      e.target.value = value.replace(/[^0-9]/g, '');
      setAmount(value);
    }
  }

  function handleAddToDonationCart(donationType) {
    const isInCart2 = donationCartItems.find(item => item.id === donationType._id);

    if (!isInCart2) {
      addToDonationCart({
        id: donationType._id,
        title: donationType.title,
        amount: donationType.amount,
        quantity: 1
      });
      toast.dismiss();
      toast.success("Donation Added to cart !!", {
        position: "top-right",
        autoClose: 3000,
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

  async function handlePayment() {
    setLoading(true);
    toast.dismiss();
    try {
      if (amount === 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      const response = await axios.post(`${backend}/admin/guestDonation/add`, { amount: amount });
      const data = response.data.data

      const paymentObject = new window.Razorpay({
        key: "rzp_live_BMJ2CcMdY7bNr6",
        order_id: data.id,
        ...data,
        handler: function (response) {
          const option2 = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: amount,
          }
          axios.post(`${backend}/admin/guestDonation/status`, option2)
            .then((response) => {
              if (response.status === 200) {
                setLoading(true)
                toast.success("Donation Placed successfully")
                setAmount(0)
                navigate('/')
              } else {
                console.log("error while placing order");
              }
            }).catch((error) => {
              console.log(error);
            })
        }
      })
      paymentObject.open()
    } catch (error) {
      console.log("error while order placement", error);
    }
  }


  return (
    <>
      <div
        className="w-full h-auto relative bg-[#fde5bc]"
        style={{
          backgroundImage: `url(${Image1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="px-4 md:px-20 pt-4 relative z-50">
          <Navbar />
        </div>
        <div className="w-full h-auto flex flex-col px-5 md:px-10 xl:px-20 mt-10 gap-4 md:gap-8 lg:gap-10">
          <div className="w-full h-auto flex justify-center items-center relative rounded-2xl overflow-hidden sm:h-[300px] lg:h-[400px]">
            <img
              src={images[0]}
              alt="single donation image"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="inset-0 bg-black opacity-30 w-full h-full absolute"></div>
            <div className="w-full h-auto flex flex-col absolute gap-2 lg:gap-4">
              <h1 className="text-white text-center font-prata text-sm sm:text-xl lg:text-2xl xl:text-4xl">
                {singleDonation?.title}
              </h1>
              <p className="text-white font-nunito text-center text-xs sm:px-10 sm:text-sm md:px-20 md:text-base lg:px-40 xl:px-60">
                {singleDonation?.description?.slice(0, 150)}
              </p>
              <div className="w-full h-auto flex justify-center items-center">
                <a href={`/donation/single-donation/${id}#section2`}>
                  <button className="px-4 py-2 bg-[#EB852C] text-white font-poppins rounded-3xl text-sm lg:py-3 lg:text-base lg:px-6 md:hover:bg-[#fd8721]">
                    Donate Now
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col mb-8 md:px-10">
            <p className="text-[#EB852C] text-sm font-prata text-center sm:text-base md:text-lg lg:text-xl">
              {singleDonation?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col py-10 px-5 md:px-10 lg:px-20 lg:py-20" id="section2">
        <h1 className="w-full h-auto text-center text-[#3B2106] font-prata md:text-xl lg:text-2xl xl:text-4xl">
          You Can Also Contribute For {singleDonation?.title}
        </h1>
        <div className="w-full h-auto flex flex-col">
          {singleDonation?.donationsCategory?.map((donation, index) => (
            <div key={index} className="w-full h-auto flex flex-col my-4 gap-2">
              <h1 className="my-4 lg:my-6 w-full h-auto text-lg text-center text-[#444444] sm:text-xl font-nunito xl:text-2xl font-semibold">
                {donation.title}
              </h1>
              <div className="w-full h-auto flex flex-wrap gap-6 justify-center items-center">
                {donation?.donationTypes?.map((donationType, index) => (
                  <div
                    key={index}
                    className="w-[300px] h-72 rounded-full flex justify-center items-center relative 2xl:h-80 2xl:w-[320px]"
                  >
                    <div className="w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center">
                      <div className="w-full h-full flex flex-col justify-center items-center relative py-3 gap-3 2xl:py-8 z-40">
                        <div className="w-full h-auto flex flex-col justify-center items-center gap-2 xl:gap-3">
                          <h1 className="text-center font-bold font-nunito text-lg xl:text-xl px-7">
                            {donationType.title}
                          </h1>
                          <div className="text-lg text-[#ECA242] xl:text-xl font-semibold">
                            ₹{donationType.amount}
                          </div>
                          <div className="w-full h-auto flex justify-center items-center">
                            <button className="px-6 py-2 text-white bg-[#EB852C] rounded-3xl md:hover:bg-[#f0913e]" onClick={() => handleAddToDonationCart(donationType)}>
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
                      style={{
                        transform: `rotate(${scrollY}deg)`, // Spins the image
                        transition: "transform 5s linear",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-auto flex flex-col px-5 items-center justify-center py-10 lg:py-20 bg-gradient-to-r from-[#EB852C] to-[#854B19]">
        <div className="w-full h-auto flex flex-col gap-5 md:w-[70%] xl:w-[50%]">
          <h1 className="w-full h-auto text-center font-prata md:text-xl lg:text-2xl xl:text-4xl text-white">
            Any Donation for {singleDonation?.title}
          </h1>
          <p className="font-nunito font-semibold text-white text-center px-10 xl:px-20 text-sm xl:text-base">
            {singleDonation?.description?.length > 100
              ? singleDonation?.description?.slice(0, 100) + "..."
              : singleDonation?.description}
          </p>
          <div className="w-full h-auto flex rounded-lg border-2 border-[#ba9676] py-3 bg-[#e9bb93] px-4 gap-2 font-poppins">
            <span className="text-black fonr-semibold">&#8377;</span>
            <input
              type="number"
              min={0}
              onWheel={(e) => e.currentTarget.blur()}
              onChange={handleInputChange}
              className="flex-1 px-2 text-black h-full bg-transparent placeholder-black outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="Enter Amount"
            />
          </div>
          <button onClick={handlePayment} className="w-full h-auto flex rounded-3xl py-3 bg-white text-[#EB852C] md:hover:text-white md:hover:bg-[#EB852C] duration-300 ease-in-out border border-white font-nunito justify-center items-center">
            Donate Now
          </button>
        </div>
      </div>
      <div className="w-full md:px-20 px-4 py-20">
        <PaymentDetailsCard />
      </div>
    </>
  );
}

export default SingleDonation;
