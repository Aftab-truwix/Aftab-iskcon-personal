import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const backend = import.meta.env.VITE_BACKEND_URL;

const ShowDonationsOrders = () => {
    const [donationsOrders, setDonationsOrders] = useState([]);
    const [guptDonationsOrders, setGuptDonationsOrders] = useState([]);
    const [csrDonationsOrders, setCsrDonationsOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeFilter, setActiveFilter] = useState("ALL"); // Filter state

    // Fetch Orders from Backend
    async function fetchDonationsOrders() {
        try {
            const response = await axios.get(`${backend}/admin/donationOrder/get`);
            console.log(response.data)
            setDonationsOrders(response.data);
        } catch (error) {
            console.log("Error while fetching orders", error);
        }
    }

    async function fetchGuptDonationsOrders() {
        try {
            const response = await axios.get(`${backend}/admin/guestDonation/get`);
            setGuptDonationsOrders(response.data.response);
        } catch (error) {
            console.log("Error while fetching gupt orders", error);
        }
    }

    async function fetchCsrDonationsOrders() {
        try {
            const response = await axios.get(`${backend}/admin/csdonation/orders/get`);
            setCsrDonationsOrders(response.data.response);
        } catch (error) {
            console.log("Error while fetching CSR orders", error);
        }
    }

    useEffect(() => {
        fetchDonationsOrders();
        fetchGuptDonationsOrders();
        fetchCsrDonationsOrders();
    }, []);

    // Filter Orders Based on Selected Type
    const filteredOrders = () => {
        if (activeFilter === "ALL") return [...donationsOrders, ...guptDonationsOrders, ...csrDonationsOrders];
        if (activeFilter === "NORMAL") return donationsOrders;
        if (activeFilter === "GUPT") return guptDonationsOrders;
        if (activeFilter === "CSR") return csrDonationsOrders;
    };

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex gap-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${activeFilter === "ALL" ? "bg-[#f97316] text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setActiveFilter("ALL")}
                >
                    All Donations
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeFilter === "NORMAL" ? "bg-[#f97316] text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setActiveFilter("NORMAL")}
                >
                    Normal Donations
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeFilter === "GUPT" ? "bg-[#f97316] text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setActiveFilter("GUPT")}
                >
                    Gupt Daan Donations
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeFilter === "CSR" ? "bg-[#f97316] text-white" : "bg-gray-200 text-black"}`}
                    onClick={() => setActiveFilter("CSR")}
                >
                    CSR Donations
                </button>
            </div>

            {/* Orders Table */}
            <div className="w-full h-[480px] flex flex-col gap-3 overflow-y-auto px-5 py-5 bg-[#ffffff] rounded-3xl shadow-lg">
                <div className="w-full max-w-6xl mx-auto rounded-lg p-4">
                    <h2 className="text-2xl font-bold mb-6 text-amber-900 font-serif">Donations Orders History</h2>

                    <table className="w-full border-collapse overflow-y-scroll">
                        <thead>
                            <tr className="bg-amber-200">
                                <th className="p-3 text-left text-amber-900 font-semibold">Order ID</th>
                                <th className="p-3 text-left text-amber-900 font-semibold">Amount</th>
                                <th className="p-3 text-left text-amber-900 font-semibold">Payment</th>
                                <th className="p-3 text-left text-amber-900 font-semibold">Status</th>
                                <th className="p-3 text-left text-amber-900 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders().map((order) => (
                                <tr
                                    key={order._id || order.guestDonationId}
                                    className="hover:bg-amber-100 transition-colors border-b border-amber-100 cursor-pointer"
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <td className="p-3 text-amber-900 font-medium">{order._id || order.guestDonationId}</td>
                                    <td className="p-3 text-amber-900">₹{order.amount}</td>
                                    <td className="p-3 text-amber-800">
                                        <span className={`px-6 py-1 rounded-full ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'}`}>
                                            {order.paymentStatus || "PENDING"}
                                        </span>
                                    </td>
                                    <td className="p-3 text-amber-800">{order.donationOrderStatus || "Completed"}</td>
                                    <td className="p-3 text-amber-600 font-mono">{order.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Popup */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 max-h-screen overflow-y-scroll" style={{
                    scrollbarWidth: "none"
                }}>
                    <div className="bg-white w-1/2 rounded-lg shadow-lg p-6 relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                            onClick={() => setSelectedOrder(null)}
                        >
                            <X size={24} />
                        </button>

                        {/* Order Details */}
                        <h2 className="text-2xl font-bold mb-4 text-amber-900">Order Details</h2>

                        <div className="grid grid-cols-2 gap-4 text-gray-800">
                            <p><span className="font-semibold">Order ID:</span> {selectedOrder._id || selectedOrder.guestDonationId}</p>
                            <p><span className="font-semibold">Amount:</span> ₹{selectedOrder.amount}</p>
                            <p><span className="font-semibold">Payment Status:</span> {selectedOrder.paymentStatus || "PENDING"}</p>
                            <p><span className="font-semibold">Order Status:</span> {selectedOrder.donationOrderStatus || "Completed"}</p>
                            <p><span className="font-semibold">Ordered At:</span> {selectedOrder.createdAt}</p>
                        </div>

                        {/* User Details (If Available) */}
                        {selectedOrder.user && (
                            <>
                                <h3 className="text-lg font-semibold mt-4">User Details</h3>
                                <p className="text-gray-700"><span className="font-semibold">Name:</span> {selectedOrder.user.name}</p>
                                <p className="text-gray-700"><span className="font-semibold">Email:</span> {selectedOrder.user.email}</p>
                                <p className="text-gray-700"><span className="font-semibold">Contact:</span> {selectedOrder.contact}</p>
                            </>
                        )}

                        {/* User Details (If Available) */}
                        {selectedOrder.name && (
                            <>
                                <h3 className="text-lg font-semibold mt-4">User Details</h3>
                                <p className="text-gray-700"><span className="font-semibold">Name:</span> {selectedOrder.name}</p>
                                <p className="text-gray-700"><span className="font-semibold">Email:</span> {selectedOrder.email}</p>
                            </>
                        )}

                        {/* order items (If Available) */}
                        {selectedOrder?.donationItems?.length > 0 && (
                            <>
                                {selectedOrder.donationItems && selectedOrder.donationItems.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedOrder.donationItems.map((item, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                                                        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                                                        <td className="border border-gray-300 px-4 py-2">₹{item.amount}</td>
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

export default ShowDonationsOrders;
