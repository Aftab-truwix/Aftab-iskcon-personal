import React, { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const backend = import.meta.env.VITE_BACKEND_URL;

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // Store clicked order

    async function fetchOrders() {
        try {
            const response = await axios.get(`${backend}/admin/order/get`);
            setOrders(response.data);
        } catch (error) {
            console.log("Error while fetching orders", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    return (
        <div>
            {/* Orders Table */}
            <div className='w-full h-[450px] flex flex-col gap-3 overflow-y-auto px-5 py-5 bg-[#ffffff] rounded-3xl shadow-lg'>
                <div className="w-full max-w-6xl mx-auto rounded-lg p-4">
                    <h2 className="text-2xl font-bold mb-6 text-amber-900 font-serif">Order History</h2>

                    <table className="w-full border-collapse overflow-y-scroll">
                        <thead>
                            <tr className="bg-amber-200 backdrop-blur-sm">
                                <th className="p-3 text-left text-amber-900 font-semibold rounded-tl-lg">ID</th>
                                <th className="p-3 text-left text-amber-900 font-semibold">Price</th>
                                <th className="p-3 text-left text-amber-900 font-semibold">Payment</th>
                                <th className="p-3 text-left text-amber-900 font-semibold rounded-tr-lg">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.map((order, orderIndex) =>
                                <tr
                                    key={`${orderIndex}`}
                                    className="hover:bg-amber-100/50 transition-colors border-b border-amber-100/80 cursor-pointer"
                                    onClick={() => setSelectedOrder(order)} // Open popup on click
                                >
                                    <td className="p-3 text-amber-600 font-mono">{order._id}</td>
                                    <td className="p-3 text-amber-600 font-mono">{order.amount}</td>
                                    <td className="p-3 text-amber-800">
                                        <span className={`inline-block px-6 py-1 rounded-full ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="p-3 text-amber-800">{order.orderStatus}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Popup */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
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
                            <p><span className="font-semibold">Order ID:</span> {selectedOrder._id}</p>
                            {/* <p><span className="font-semibold">User ID:</span> {selectedOrder.userId}</p> */}
                            <p><span className="font-semibold">Amount:</span> ₹{selectedOrder.amount}</p>
                            <p><span className="font-semibold">Payment Status:</span> {selectedOrder.paymentStatus}</p>
                            <p><span className="font-semibold">Order Status:</span> {selectedOrder.orderStatus}</p>
                            <p><span className="font-semibold">Shipping Address:</span> {selectedOrder.shippingAddress}</p>
                            <p><span className="font-semibold">Contact:</span> {selectedOrder.contact}</p>
                            <p><span className="font-semibold">Ordered At:</span> {selectedOrder.createdAt}</p>
                        </div>

                        {selectedOrder.user && (
                            <>
                                <h3 className="text-lg font-semibold mt-4">User Details</h3>
                                <p className="text-gray-700"><span className="font-semibold">Name:</span> {selectedOrder.user.name}</p>
                                <p className="text-gray-700"><span className="font-semibold">Email:</span> {selectedOrder.user.email}</p>
                            </>
                        )}


                        {/* Order Items List */}
                        <h3 className="text-lg font-semibold mt-4">Order Items</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {selectedOrder.orderItems.map((item) => (
                                <li key={item._id}>
                                    {item.name} - ₹{item.price} (Qty: {item.quantity})
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowOrders;
