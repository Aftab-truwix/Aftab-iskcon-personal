import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const backend = import.meta.env.VITE_BACKEND_URL; // Define backend URL

const Classes = () => {
  const [classes, setClasses] = useState([]);

  // Fetch classes when the component mounts
  useEffect(() => {
    fetchClasses();
  }, []);

  // Fetch classes from the backend
  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${backend}/admin/offlineClasses/`);
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error while fetching classes:", error);
    }
  };

  return (
    <div className="w-full h-full bg-[#fff4dc] relative">
      {/* Navbar */}
      <div className="w-full h-[70px] z-[100] absolute top-4 px-4 md:px-20">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-48 px-4 md:px-20">
        <h1 className="text-4xl font-prata font-bold mb-8 text-[#2c3e50]">
          Offline Classes
        </h1>

        {/* Classes Grid */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {classes.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-white border-2 border-orange-500 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 "
              >
                {/* Class Title */}
                <h3 className="text-xl font-bold text-[#2c3e50] mb-4">
                  {classItem.title}
                </h3>

                {/* Class Description */}
                <p className="text-gray-600 text-sm mb-4">
                {classItem.description.length > 100
                      ? classItem.description.slice(0, 100) + "..."
                      : classItem.description}
                </p>

                {/* Class Details */}
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm">
                    <strong className="text-[#2c3e50]">Timings:</strong>{" "}
                    {classItem.timings}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong className="text-[#2c3e50]">Location:</strong>{" "}
                    {classItem.location}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong className="text-[#2c3e50]">Days:</strong>{" "}
                    {classItem.classesDays}
                  </p>
                </div>

                {/* Action Buttons */}
                {/* <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => openEditPopup(classItem._id)}
                    className="bg-[#3498db] text-white px-4 py-2 rounded-lg hover:bg-[#2980b9] transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteClasses(classItem._id)}
                    className="bg-[#e74c3c] text-white px-4 py-2 rounded-lg hover:bg-[#c0392b] transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No classes found.</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
