import React from "react";
import { useNavigate } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";

const DonationCartPopup = ({ donationCartItems, onClose, addToCart, removeFromCart, deleteFromCart }) => {
  const totalAmount = donationCartItems.reduce((sum, item) => sum + item.amount * item.quantity, 0);

  const navigate = useNavigate();

  const handlePayNow = () => {
    // Handle payment logic here
    navigate("/donation-checkout");
    onClose();
    
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center -top-[700px] bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6  max-w-7xl w-full">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Donating for</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✖</button>
        </div>

        {/* Donation Cart Items */}
        <div className="mt-4 space-y-3">
          {donationCartItems.length > 0 ? (
            donationCartItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center border p-3 rounded-lg border-orange-400">
                <h3 className="w-[50%] md:w-[60%] text-xs font-semibold sm:text-base xl:text-lg">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold w-[20%] md:w-[15%] sm:text-sm xl:text-base">
                  ₹ {item.amount * item.quantity}
                </p>
                <div className="flex items-center bg-[#ECA242] text-white rounded-lg px-2 py-1">
                  <button 
                    onClick={() => removeFromCart(item)} 
                    className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold w-[25px] md:w-[50px] text-center xl:text-lg">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => addToCart(item)} 
                    className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer"
                  >
                    +
                  </button>
                  
                </div>
                <span>
                    <button 
                      onClick={() => deleteFromCart(item)} 
                      className="w-4 h-4 md:pl-0 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer"
                    >
                      <BsTrash3 />
                    </button>
                  </span>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold h-40">Cart is Empty</p>
          )}
        </div>

        {/* Total Amount */}
        <div className="mt-6 flex justify-between items-center border-t pt-3">
          <span className="text-lg font-semibold">Total Amount:</span>
          <span className="text-xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</span>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-4">
          <button className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button onClick={handlePayNow} className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCartPopup;
