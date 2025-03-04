import React from 'react'
import BgOne from '../../assets/bg1.webp'
import CalendorIcon from '../../assets/calenderIcon.webp'
import COmmentIcon from '../../assets/commentIcon.webp'
import Blogimg1 from '../../assets/blog1.webp'
import Blogimg2 from '../../assets/blog2.webp'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Section3() {
    return (
        <div className='w-full h-auto flex flex-col bg-[#FDE3B6] overflow-hidden px-5 md:px-10 lg:flex-row-reverse 2xl:h-screen' style={
            {
                backgroundImage: `url(${BgOne})`,
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }
        }>
            <div className='w-full h-auto flex flex-col mt-10 gap-8'>
                <div className='w-full h-auto flex flex-col gap-2 lg:gap-3'>
                    <h1 className='font-nunito text-center sm:text-base lg:text-lg'>The Wisdom Blog</h1>
                    <h1 className='font-prata text-center text-[#322038] sm:text-2xl lg:text-3xl'>
                        Find valuable information and <br />
                        inspiration in our stories
                    </h1>
                </div>
                <div className='w-full h-auto flex flex-col gap-10 md:flex-wrap md:flex-row'>
                    <div className='w-full h-auto flex flex-col gap-4 sm:gap-6 sm:w-[50%] sm:mx-auto md:w-[30%] md:mx-0 lg:w-[20%] lg:justify-between'>
                        <div className='w-full h-auto flex flex-col gap-4 sm:gap-6'>
                            <h1 className='font-nunito text-lg md:text-base'>Spiritual</h1>
                            <h1 className='font-prata text-3xl sm:text-4xl md:text-2xl'>
                                Kartik Purnima: <br />
                                A Festival of Light <br />
                                and Devotion
                            </h1>
                            <div className='w-full h-auto flex items-center gap-3 '>
                                {/* <img src="" alt="" className='w-10 h-10 rounded-full bg-gray-300 sm:w-12 sm:h-12 md:h-10 md:w-10' /> */}
                                <FaUserCircle size={35} className='text-[#EB852C]' />
                                <h1 className='font-nunito text-[#322038] font-bold sm:text-lg md:text-base'>Neha Yadav</h1>
                            </div>
                            <div className='w-full h-auto flex flex-col mt-4 gap-5'>
                                <div className='w-full h-auto flex gap-3 items-center sm:text-lg md:text-base'>
                                    <img src={COmmentIcon} alt="Comment Icon" />
                                    <span className='font-nunito text-[#322038] font-medium'>30 Comments</span>
                                </div>
                                <div className='w-full h-auto flex gap-3 items-center sm:text-lg md:text-base'>
                                    <img src={CalendorIcon} alt="Comment Icon" />
                                    <span className='font-nunito text-[#322038] font-medium'>15th December 2024</span>
                                </div>
                            </div>
                        </div>
                        {/* <div className='w-full h-auto flex gap-3 items-center mt-10 lg:mt-0 lg:mb-14 xl:mb-20 2xl:mb-32 '>
                            <button className='w-10 h-10 rounded-full border border-[#32203875] bg-[#5F2C7014] flex justify-center items-center xl:h-12 xl:w-12'>
                                <MdOutlineKeyboardArrowLeft size={20} className='text-black' />
                            </button>
                            <button className='w-10 h-10 rounded-full bg-[#EB852C] flex justify-center items-center xl:h-12 xl:w-12'>
                                <MdOutlineKeyboardArrowRight size={20} className='text-white' />
                            </button>
                        </div> */}
                    </div>
                    <div className='w-full h-auto flex flex-col relative sm:w-[80%] sm:mx-auto md:mx-0 md:w-[40%] lg:w-[40%] md:justify-end'>
                        <div className='w-[60%] h-auto ml-auto'>
                            <img src={Blogimg1} alt="bg color" />
                        </div>
                        <img src={Blogimg2} alt="krishna ji" className='absolute w-[72.5%] top-0 left-0 md:top-auto md:bottom-0 lg:w-[75%]' />
                    </div>
                    <div className='w-full h-auto flex flex-col gap-5 font-nunito lg:w-[30%] pb-4'>
                        <div className='w-full h-auto flex flex-col gap-8 lg:gap-4'>
                            <p className='font-semibold sm:text-lg lg:text-sm xl:text-base'>
                                Kartik month is a very special month for all devotees of Lord Krishna especially for ISKCON temples. It is often called the “month of Damodar” or Kartik. This is when devotees strongly connect with Lord Krishna and remember his divine pastimes and blessings.
                                Kartik Purnima is the culmination of the sacred month. It is a full moon day that personifies purity, devotion, and the power of selfless love. Devotees gather to celebrate, chant, and honor Lord Krishna.
                            </p>
                            <h1 className='font-bold text-lg sm:text-xl lg:text-lg'>When is Kartik Purnima?</h1>
                            <p className='font-semibold sm:text-lg lg:text-sm xl:text-base'>
                                Kartik Purnima falls on the 15th day in the Hindu lunar month of Kartik. It usually falls between October-November. The day is important because it is the culmination of Kartik month. It is a very widely observed month for Shri Krishna’s devotees and in ISKCON temples worldwide. The acts of devotion and charity hold extreme importance in this month.
                            </p>
                        </div>
                        <div className='w-full h-auto flex'>
                            <Link to="/blogs">
                            <button className='bg-[#EB852C] text-white px-5 py-2 rounded-3xl'>View More</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section3