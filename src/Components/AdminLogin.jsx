import React, { useEffect, useState } from 'react'
import Image from '../assets/signUpImage.webp'
import Logo from '../assets/logo.svg'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const backend = import.meta.env.VITE_BACKEND_URL;

function AdminLogin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
    })
    const [currentIndex, setCurrentIndex] = useState(0);
    const carousal = [
        {
            id: 1,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
        {
            id: 2,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
        {
            id: 3,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
        {
            id: 4,
            image: Image,
            title: `नमः ॐ विष्णु पादय, कृष्ण पृष्ठाय भूतले, 
    श्रीमते भक्ति वेदांत स्वामिन इति नामिने ।
    नमस्ते सरस्वते देवे गौर वाणी प्रचारिणे, 
    निर्विशेष शून्य-वादी पाश्चात्य देश तारिणे ।।`
        },
    ];

    const navigate = useNavigate()

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
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!userDetails.email || !emailRegex.test(userDetails.email)) {
            alert("Please enter a valid email address");
            return;
        }
        if (!userDetails.password) {
            alert("Password is required");
            return;
        }
    
        try {
            const response = await axios.post(`${backend}/secure/login`, userDetails, { withCredentials: true });
            if (response.status === 200 || response.status === 201) {
                alert('Admin successfully logged in');
                localStorage.setItem("isAuthenticated", "true"); // Store auth state
                localStorage.setItem("token", JSON.stringify(response.data.token));
    
                setUserDetails({ email: '', password: '' });
                navigate('/admin-dashboard');
            }
        } catch (error) {
            console.log("Error while logging in:", error);
            alert(error.response?.data?.message || "Login failed");
        }
    }
    

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className='w-full h-auto flex flex-col mt-10 gap-8 md:flex-row-reverse md:mt-0'>
            <div className='w-full h-auto flex flex-col gap-14 px-5 lg:px-10 xl:px-20 sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] lg:my-10'>
                <Link to='/' className='w-full h-auto flex justify-center items-center'>
                    <img src={Logo} alt="iskcon Logo" className='w-32 h-auto object-cover' />
                </Link>
                <div className='w-full h-auto flex flex-col font-nunito'>
                    <h1 className='font-semibold text-lg lg:text-xl'>Admin Sign In</h1>
                    <p className='text-sm font-semibold my-3 lg:my-4'>Welcome Back, Log in to manage your shipments and clients effortlessly.</p>
                    <div className='w-full h-auto flex flex-col my-5 gap-4 lg:my-7 lg:gap-6'>
                        <input type="email" placeholder='Email Address' value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='w-full h-auto px-3 border border-black rounded-3xl py-2' />
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={userDetails.password}
                                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-full border border-black "
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
                            </button>
                        </div>
                        <button onClick={handleSignIn} className='w-full h-auto py-2 bg-[#EB852C] flex justify-center items-center text-white rounded-3xl'>
                            Sign In
                        </button>
                        <p className='w-full h-auto flex justify-end'>
                            <Link to='/forgot-password' className='text-[#3F3F3F80] text-sm'>Forgot Password</Link>
                        </p>
                        <div className='w-full h-auto flex justify-center items-center gap-1'>
                            <span className='text-[#6E6868]'>Don't have an account?</span>
                            <Link to='/signup' className='text-[#EB852C]'>Sign Up</Link>
                        </div>
                    </div>
                    {/* <div className='w-full h-auto flex items-center justify-center gap-2'>
                        <span className='w-[30%] h-[1px] bg-gray-400'></span>
                        <span className='text-[#999A9C]'>Or</span>
                        <span className='w-[30%] h-[1px] bg-gray-400'></span>
                    </div>
                    <button className='w-full h-auto py-2 bg-[#191F1F] flex justify-center items-center text-white rounded-3xl my-5 gap-2'>
                        <FaGoogle size={20} className='text-white' />
                        Continue with Google
                    </button> */}
                </div>
            </div>
            <div className='w-full h-auto flex flex-col sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] md:h-full'>
                <div className='w-full h-auto flex overflow-hidden relative md:h-full'>
                    <div className="flex h-full transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {
                            carousal.map((item, index) => (
                                <div key={index} className='min-w-full h-auto relative flex md:h-[750px] lg:h-[840px]'>
                                    <img src={item.image} key={index} alt="item image" className='w-full h-full object-cover' />
                                    <p className='text-[#ECA242] font-poppins text-center px-10 absolute bottom-20 text-lg'>{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-full h-auto flex flex-col absolute bottom-10 gap-7'>
                        <div className='w-full h-auto flex justify-center items-center'>
                            {carousal.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-3 w-3 rounded-full mx-1 ${currentIndex === index ? 'bg-[#EB852C]' : 'bg-gray-300'
                                        }`}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin