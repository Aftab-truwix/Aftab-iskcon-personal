import { FaArrowUp, FaArrowDown, FaUsers, FaBox, FaDonate, FaWarehouse } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function StatsCard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [donationsOrders, setDonationsOrders] = useState([]);
  const [guptDonationsOrders, setGuptDonationsOrders] = useState([]);
  const [csrDonationsOrders, setCsrDonationsOrders] = useState([]);

  const fetchAllUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${backend}/secure/all`);
      if (response.data && response.data.users) {
        setUsers(response.data.users);
      } else {
        setError("No users found.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${backend}/admin/product/all`);
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        setError("No Products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  async function fetchDonationsOrders() {
    try {
      const response = await axios.get(`${backend}/admin/donationOrder/get`);
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

  const getTotalAmount = () => {
    const totalDonations = donationsOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalGuptDonations = guptDonationsOrders.reduce((sum, order) => sum + order.amount, 0);
    const totalCsrDonations = csrDonationsOrders.reduce((sum, order) => sum + order.amount, 0);

    return totalDonations + totalGuptDonations + totalCsrDonations;
  };

  const getTotalInventory = () => {
    return products.reduce((sum, product) => sum + product.stock, 0);
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllProducts();
    fetchDonationsOrders();
    fetchGuptDonationsOrders();
    fetchCsrDonationsOrders();
  }, []);

  return (
    <div className="bg-[#FEF4DC] py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="text-sm font-semibold uppercase font-prata">Total Users</p>
              <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-prata py-4">{users.length}</h2>
              <FaUsers className="w-10 h-full opacity-80" />
              </div>  
            </div>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="text-sm font-semibold uppercase font-prata">Total Products</p>
              <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-prata py-4">{products.length}</h2>
              <FaBox className="w-10 h-full opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Donations Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="text-sm font-semibold uppercase font-prata">Total Donations</p>
              <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-prata py-4">₹ {getTotalAmount()}</h2>
              <FaDonate className="w-10 h-full opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Inventory Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="text-sm font-semibold uppercase font-prata">Total Inventory</p>
              <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold font-prata py-4">{getTotalInventory()}</h2>
              <FaWarehouse className="w-10 h-full opacity-80" />
              </div>
            

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}