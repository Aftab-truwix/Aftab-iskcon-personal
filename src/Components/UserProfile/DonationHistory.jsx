import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Navbar from "../Navbar";

const backend = import.meta.env.VITE_BACKEND_URL;

const DonationHistory = () => {
  const [userId, setUserId] = useState(""); // State to store user ID
  const [donations, setDonations] = useState([]); // State to store all donations
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [popup, setPopup] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [user, setUser] = useState({});

  const fetchUserData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const response = await fetch(`${backend}/secure/decode`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();
      setUser(data);
      setUserId(data?.userData?.userId);

      // console.log("✅ User Data:", data);
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Fetch Donations by User ID
  const fetchDonationsByUserId = async () => {
    if (!userId) {
      setError("Please enter a valid user ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Fetch normal donations
      let normalDonations = [];
      try {
        const normalResponse = await axios.get(
          `${backend}/admin/donationOrder/${userId}`
        );
        normalDonations = normalResponse.data.data || []; // Ensure it's an array
      } catch (normalError) {
        console.error("Error fetching normal donations:", normalError);
        // Do not throw error or set message if normal donations are missing
      }

      // Fetch CSR donations
      let csrDonations = [];
      try {
        const csrResponse = await axios.get(
          `${backend}/admin/csdonation/orders/${user?.userData?.email}`
        );
        csrDonations = csrResponse.data.response || []; // Ensure it's an array
      } catch (csrError) {
        console.error("Error fetching CSR donations:", csrError);
        // Do not throw error or set message if CSR donations are missing
      }

      // Combine all donations
      const allDonations = [...normalDonations, ...csrDonations];

      if (allDonations.length === 0) {
        setError("No donations found for this user.");
        setDonations([]);
      } else {
        setDonations(allDonations);
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
      setError("Failed to fetch donations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDonationsByUserId();
    }
  }, [userId]);

  return (
    <div className="relative w-full h-full bg-[#f3f4f6]">
      {/* Search Bar */}
      <div className="w-full h-[70px] z-[100] absolute top-4 px-4 lg:px-20">
        <Navbar />
      </div>

      {/* Donations Table */}
      <div className="w-full h-[550px] flex flex-col gap-3 overflow-y-auto px-5 py-5 bg-[#fff4dc] rounded-3xl shadow-lg">
        <div className="w-full px-0 lg:px-20 rounded-lg pt-40">
          <h2 className="text-2xl font-bold mb-6 text-amber-900 font-serif">
            Donations by {user?.userData?.name}
          </h2>

          {/* Table for Large Screens */}
          <div className="hidden md:block">
            {donations.length > 0 ? (
              <table className="w-full border-collapse overflow-y-scroll">
                <thead>
                  <tr className="bg-amber-200">
                    <th className="p-3 text-left text-amber-900 font-semibold">
                      Order ID
                    </th>
                    <th className="p-3 text-left text-amber-900 font-semibold">
                      Amount
                    </th>
                    <th className="p-3 text-left text-amber-900 font-semibold">
                      Payment
                    </th>
                    <th className="p-3 text-left text-amber-900 font-semibold">
                      Status
                    </th>
                    <th className="p-3 text-left text-amber-900 font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((order) => (
                    <tr
                      key={order._id || order.guestDonationId}
                      className="hover:bg-amber-100 transition-colors border-b border-amber-100 cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="p-3 text-amber-900 font-medium">
                        {order._id || order.guestDonationId}
                      </td>
                      <td className="p-3 text-amber-900">₹{order.amount}</td>
                      <td className="p-3 text-amber-800">
                        <span
                          className={`px-6 py-1 rounded-full ${
                            order.paymentStatus === "PAID"
                              ? "bg-green-100 text-green-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {order.paymentStatus || "PENDING"}
                        </span>
                      </td>
                      <td className="p-3 text-amber-800">
                        {order.donationOrderStatus || "Completed"}
                      </td>
                      <td className="p-3 text-amber-600 font-mono">
                        {order.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No donations found for this user.</p>
            )}
          </div>

          {/* Cards for Mobile Screens */}
          <div className="block md:hidden">
            {donations.length > 0 ? (
              donations.map((order) => (
                <div
                  key={order._id || order.guestDonationId}
                  className="bg-white p-2 rounded-lg shadow-md mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-amber-900 font-medium">
                      Order ID: {order._id || order.guestDonationId}
                    </p>
                  </div>
                  <div>
                    <p className="text-amber-900 mb-2">
                      {" "}
                      Amount:₹{order.amount}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-amber-800">
                      Payment:{" "}
                      <span
                        className={`px-2 py-1 rounded-full ${
                          order.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {order.paymentStatus || "PENDING"}
                      </span>
                    </p>
                    <p className="text-amber-800">
                      Status: {order.donationOrderStatus || "Completed"}
                    </p>
                  </div>
                  <p className="text-amber-600 font-mono">
                    Date: {order.createdAt}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No donations found for this user.</p>
            )}
          </div>
        </div>
      </div>
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[100] max-h-screen overflow-y-scroll"
          style={{
            scrollbarWidth: "none",
          }}
        >
          <div className="bg-white w-1/2 rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedOrder(null)}
            >
              <X size={24} />
            </button>

            {/* Order Details */}
            <h2 className="text-2xl font-bold mb-4 text-amber-900">
              Order Details
            </h2>

            <div className="grid grid-cols-2 gap-4 text-gray-800">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {selectedOrder._id || selectedOrder.guestDonationId}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ₹
                {selectedOrder.amount}
              </p>
              <p>
                <span className="font-semibold">Payment Status:</span>{" "}
                {selectedOrder.paymentStatus || "PENDING"}
              </p>
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                {selectedOrder.donationOrderStatus || "Completed"}
              </p>
              <p>
                <span className="font-semibold">Ordered At:</span>{" "}
                {selectedOrder.createdAt}
              </p>
            </div>

            {/* User Details (If Available) */}
            {selectedOrder.user && (
              <>
                <h3 className="text-lg font-semibold mt-4">User Details</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedOrder.user.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedOrder.user.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Contact:</span>{" "}
                  {selectedOrder.contact}
                </p>
              </>
            )}

            {/* User Details (If Available) */}
            {selectedOrder.name && (
              <>
                <h3 className="text-lg font-semibold mt-4">User Details</h3>
                <p className="text-gray-700">
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedOrder.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedOrder.email}
                </p>
              </>
            )}

            {/* order items (If Available) */}
            {selectedOrder?.donationItems?.length > 0 && (
              <>
                {selectedOrder.donationItems &&
                  selectedOrder.donationItems.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2">
                        Order Items
                      </h3>
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Item
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Quantity
                            </th>
                            <th className="border border-gray-300 px-4 py-2 text-left">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.donationItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2">
                                {item.title}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                {item.quantity}
                              </td>
                              <td className="border border-gray-300 px-4 py-2">
                                ₹{item.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
