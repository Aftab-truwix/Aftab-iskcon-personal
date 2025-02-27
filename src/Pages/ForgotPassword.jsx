import React, { useState } from 'react';
import Slider from '../utils/Slider';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otpPopUp, setOtpPopUp] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(179); // Timer in seconds (2:59)
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const navigate = useNavigate();

    // Handle email submission to send OTP
    const handleSendOtp = async () => {
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }

        try {
            const response = await axios.post(`${backend}/secure/send-otp`, {
                email: email,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('OTP sent successfully!');
                setOtpPopUp(true);
                setTimer(179); // Reset timer
                setIsResendDisabled(true); // Disable resend button initially
            }
        } catch (error) {
            toast.error('Failed to send OTP. Please try again.');
            console.error('Error sending OTP:', error);
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        const simpleOtp = otp.join('');

        try {
            const response = await axios.post(`${backend}/secure/verify-otp`, {
                email: email,
                otp: simpleOtp,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('OTP verified successfully!');
                setIsOtpVerified(true); // Show password reset form
                setOtpPopUp(false); // Close OTP popup
            }
        } catch (error) {
            toast.error('Invalid OTP. Please try again.');
            console.error('Error verifying OTP:', error);
        }
    };

    // Handle password reset
    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error('Please enter and confirm your new password.');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post(`${backend}/secure/reset-password`, {
                email: email,
                newPassword: newPassword,
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Password reset successfully!');
                navigate('/signin'); // Redirect to sign-in page
            }
        } catch (error) {
            toast.error('Failed to reset password. Please try again.');
            console.error('Error resetting password:', error);
        }
    };

    // Handle OTP input change
    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input if a number is entered
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    // Handle OTP input backspace
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    // Handle OTP resend
    const handleResendOtp = () => {
        setTimer(179);
        setIsResendDisabled(true);
        setOtp(['', '', '', '', '', '']);
        handleSendOtp();
    };

    return (
        <div className='w-full h-auto flex flex-col mt-10 gap-8 md:flex-row-reverse md:mt-0'>
            <div className='w-full h-[70vh] flex justify-center items-center px-5 lg:px-10 xl:px-20 md:h-auto sm:w-[70%] sm:mx-auto md:mx-0 md:w-[50%] lg:my-10'>
                <div className='w-[90%] h-auto flex flex-col gap-2 lg:w-[80%]'>
                    <Link to='/signin' className='w-full h-auto mb-5'>
                        <FaArrowLeft size={25} className='text-black cursor-pointer' />
                    </Link>

                    {!isOtpVerified ? (
                        <>
                            <h2 className="text-xl font-semibold">Forgot Password</h2>
                            <p className="text-gray-600 mt-2">
                                Please enter your email to reset your password.
                            </p>

                            <input
                                type="email"
                                placeholder='Enter Your Email Id'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full h-auto px-3 py-2 rounded-3xl border my-4'
                            />

                            {/* Submit Button */}
                            <button
                                onClick={handleSendOtp}
                                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-3xl hover:bg-orange-600 transition"
                            >
                                Send OTP
                            </button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">Reset Password</h2>
                            <p className="text-gray-600 mt-2">
                                Please enter your new password.
                            </p>

                            <input
                                type="password"
                                placeholder='New Password'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='w-full h-auto px-3 py-2 rounded-3xl border my-4'
                            />

                            <input
                                type="password"
                                placeholder='Confirm New Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='w-full h-auto px-3 py-2 rounded-3xl border my-4'
                            />

                            {/* Submit Button */}
                            <button
                                onClick={handleResetPassword}
                                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-3xl hover:bg-orange-600 transition"
                            >
                                Reset Password
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* OTP Verification Popup */}
            {otpPopUp && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='w-[90%] max-w-md bg-white p-6 rounded-lg'>
                        <h2 className="text-xl font-semibold">OTP Verification</h2>
                        <p className="text-gray-600 mt-2">
                            We have sent an OTP to <span className="font-bold">{email}</span>.
                        </p>

                        {/* Timer */}
                        <p className="text-orange-500 font-bold text-center text-lg my-4">
                            {String(Math.floor(timer / 60)).padStart(2, '0')} : {String(timer % 60).padStart(2, '0')}
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
                                />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-3xl hover:bg-orange-600 transition"
                        >
                            Verify OTP
                        </button>

                        {/* Resend OTP */}
                        <p className="text-gray-600 mt-3 text-center">
                            Didn’t receive the code?{' '}
                            <button
                                className={`text-orange-500 font-semibold ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:underline'}`}
                                onClick={handleResendOtp}
                                disabled={isResendDisabled}
                            >
                                Resend OTP
                            </button>
                        </p>
                    </div>
                </div>
            )}

            <Slider />
        </div>
    );
}

export default ForgotPassword;