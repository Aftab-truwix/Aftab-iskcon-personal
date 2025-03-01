import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { X } from "lucide-react";
import EditDonationsPopup from './EditDonationPopup';

const backend = import.meta.env.VITE_BACKEND_URL;

const ShowDonations = () => {
  const [donations, setDonations] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [singleDonation, setSingleDonation] = useState(null);

  async function fetchDonations() {
    try {
      const response = await axios.get(`${backend}/admin/donation/get`);
      setDonations(response.data.data);

    } catch (error) {
      console.log("Error while fetching donations", error);
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  async function deleteDonation(id) {
    try {
      await axios.delete(`${backend}/admin/donation/delete/${id}`);
      fetchDonations();
      alert("Donation deleted successfully!");
    } catch (error) {
      console.log("Error while deleting donation", error);
    }
  }

  function handleOpenPopup(donation = null) {
    setCurrentDonation(donation);
    setPopup(true);
  }

  async function deleteDonation(id) {
    try {
      await axios.delete(`${backend}/admin/donation/delete/${id}`);
      fetchDonations();
      alert("Donation deleted successfully!");
    } catch (error) {
      console.log("Error while deleting donation", error);
    }
  }

  return (
    <div>
      {
        singleDonation
          ? <div className='w-full h-[480px] flex flex-col gap-3 overflow-y-scroll px-5 py-5 bg-white rounded-3xl'>
            <div className='w-full h-auto flex justify-between items-center'>
              <h1 className='text-2xl font-bold'>{singleDonation.title}</h1>
              <button onClick={() => setSingleDonation(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="w-full h-auto flex flex-col sm:flex-row sm:justify-center gap-6 bg-gray-100 rounded-xl p-5">
              <div className="w-full h-auto">
                <img
                  src={singleDonation.image[0]}
                  alt="image"
                  className="w-full h-48 rounded-lg bg-gray-200 sm:h-72 object-cover"
                />
              </div>
              <div className="w-full h-auto flex flex-col">
                <h1 className="my-4 lg:my-6 w-full h-auto text-3xl sm:text-2xl  font-semibold">
                  {singleDonation.title}
                </h1>
                <p
                  style={{ whiteSpace: "pre-wrap" }}
                  className="w-full h-auto text-sm text-gray-500 sm:text-base "
                >
                  {singleDonation.description}
                </p>
              </div>
            </div>
            <div className="w-full h-auto flex flex-col">
              {singleDonation?.donationsCategory?.map((donation, index) => (
                <div key={index} className="w-full h-auto flex flex-col my-4 gap-2">
                  <h1 className="my-4 lg:my-6 w-full h-auto text-3xl sm:text-2xl font-semibold">
                    {donation.title}
                  </h1>
                  <div className="w-full h-auto flex flex-wrap gap-6">
                    {donation?.donationTypes?.map((donationType, index) => (
                      <div
                        className="w-[350px] h-[150px] p-5 lg:p-7 border flex flex-col justify-between gap-4 rounded-xl shadow-md duration-500 ease-in-out hover:shadow-2xl"
                        key={index}
                      >
                        <h1 className="text-lg font-bold">{donationType.title}</h1>
                        <div className="w-full h-auto flex justify-between items-center">
                          <span className="text-lg text-gray-700 font-semibold">
                            ₹{donationType.amount}
                          </span>
                          <button className="px-6 py-2 text-white bg-[#866dcf] rounded-xl">
                            Donate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          : <div className='w-full h-[450px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-scroll px-5 py-5 bg-white rounded-3xl'>
            {
              donations.map((donation, index) => (
                <div className='h-96 p-3 lg:p-5 border flex flex-col gap-4 rounded-xl shadow-md duration-500 ease-in-out hover:shadow-2xl' key={index}>
                  <div onClick={() => setSingleDonation(donation)} className='w-full h-auto flex flex-col flex-1 gap-4'>
                    <img src={donation.image[0]} alt="" className='w-full h-48 object-cover' />
                    <h1 className='font-semibold'>{donation.title}</h1>
                    <p className='text-xs text-gray-500'>{donation.description.length > 100 ? donation.description.slice(0, 100) + "..." : donation.description.slice(0, 100)}</p>
                  </div>
                  <div className='w-full h-auto flex justify-between items-center'>
                    <button
                      onClick={() => handleOpenPopup(donation)}
                      className='bg-orange-500 text-white px-4 py-1 rounded-xl'>Edit</button>
                    <button
                      onClick={() => deleteDonation(donation._id)}
                      className='bg-[#feecce] text-orange-500 px-4 py-1 rounded-xl'>Delete</button>
                  </div>
                </div>
              ))
            }
            {popup && (
              <EditDonationsPopup
                donation={currentDonation}
                closePopup={() => setPopup(false)}
                refreshDonations={fetchDonations}
              />
            )}
          </div>
      }
    </div>
  )
}

export default ShowDonations
