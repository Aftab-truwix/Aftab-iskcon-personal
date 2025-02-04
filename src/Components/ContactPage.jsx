import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { MdPhoneCallback } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { FaChildReaching } from "react-icons/fa6";
 
const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  // State for form fields and errors
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });
 
  const [errors, setErrors] = useState({});
 
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };
 
  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", mobile: "", subject: "", message: "" });
    }
  };
 
  return (
    <div className="bg-[#fde3b6] w-full h-auto">
      <div className="px-20 pt-10 relative z-50">
        <Navbar />
      </div>
 
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <h1 className="text-black text-[40px] py-8">Contact us</h1>
 
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Call Us Card */}
          <div className="w-full md:w-[400px] h-auto bg-white mb-6">
            <div className="h-[130px] bg-[#eb852c] flex justify-center items-center">
              <TfiHeadphoneAlt size={60} className="text-white" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="text-[26px] text-gray-800 font-bold py-4">Call us</span>
              <p className="px-6 text-center py-6">
                Need assistance? Call our customer care team anytime for support.
              </p>
            </div>
            <div className="py-10 flex justify-center items-center text-[20px]">
              <span className="w-10 h-10 bg-[#eb852c] rounded-full flex justify-center items-center text-white">
                <MdPhoneCallback size={15} />
              </span>
              <span className="ml-2">+91-6396075703</span>
            </div>
          </div>
 
          {/* Email Us Card */}
          <div className="w-full md:w-[400px] h-auto bg-white mb-6">
            <div className="h-[130px] bg-[#eb852c] flex justify-center items-center">
              <RiMailSendLine size={60} className="text-white" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="text-[26px] text-gray-800 font-bold py-4">Write us</span>
              <p className="px-8 text-center py-6">
                Have a question? Email our customer care team!
              </p>
            </div>
            <div className="py-10 flex justify-center items-center text-[20px]">
              <span className="w-10 h-10 bg-[#eb852c] rounded-full flex justify-center items-center text-white">
                <RiMailSendLine size={15} />
              </span>
              <span className="ml-2">info@iskconwavecity.com</span>
            </div>
          </div>
 
          {/* Reach Us Card */}
          <div className="w-full md:w-[400px] h-auto bg-white mb-6">
            <div className="h-[130px] bg-[#eb852c] flex justify-center items-center">
              <FaChildReaching size={60} className="text-white " />
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <span className="text-[26px] text-gray-800 font-bold py-4">Reach us</span>
              <p className="px-6 text-center py-6">
                Locate our temple using Google Maps for easy navigation.
              </p>
            </div>
            <div className="w-full flex justify-center mt-4 px-6 py-4">
              <button className="font-bold w-[70%] border-2 bg-[#eb852c] rounded-full text-white py-2 flex justify-center gap-4 items-center">
                <FaChildReaching size={20} />
                Get Direction
              </button>
            </div>
          </div>
        </div>
 
        <div className="w-full flex justify-center my-6 px-6 ">
              <button className="font-bold w-[10%] border-2 bg-[#eb852c] rounded-full text-white py-2 flex justify-center gap-4 items-center">
               
                Explore FAQS
              </button>
            </div>
        {/* Contact Form */}
        <div className="w-[90%] mx-auto p-6 bg-white shadow-lg rounded-lg mb-5">
          <h2 className="text-2xl font-semibold text-center mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-black outline-none" />
                <p className="text-red-500 text-sm">{errors.name}</p>
              </div>
              <div>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-black outline-none" />
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>
              <div>
                <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-black outline-none" />
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              </div>
            </div>
            <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black outline-none" />
            <p className="text-red-500 text-sm">{errors.subject}</p>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-black resize-none outline-none"></textarea>
            <p className="text-red-500 text-sm">{errors.message}</p>
            <div className="flex justify-center">
              <button type="submit" className="w-[20%] bg-[#eb852c] text-white font-semibold py-3 rounded-lg">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default ContactPage;
 