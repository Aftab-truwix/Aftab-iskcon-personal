import React, { useState, useEffect } from "react";
import axios from "axios";
import EditClassPopup from "./EditClassPopup";

const backend = import.meta.env.VITE_BACKEND_URL; // Define backend URL

const ShowClasses =({  refreshClasses })=> {
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const openEditPopup = (classId) => {
    setSelectedClassId(classId);
    setIsPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsPopupOpen(false);
    setSelectedClassId(null);
  };

  // Fetch events
  async function fetchClasses() {
    try {
      const response = await axios.get(`${backend}/admin/offlineClasses/`);
      setClasses(response.data.data);
    } catch (error) {
      console.log("Error while fetching events", error);
    }
  }

  // Delete an event
  async function deleteClasses(classId) {
    try {
      await axios.delete(`${backend}/admin/offlineClasses/delete/${classId}`);
      fetchClasses();
      alert("Class deleted successfully!");
    } catch (error) {
      console.error("Error while deleting class", error);
    }
  }

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <div className="w-full p-6 bg-white h-auto rounded-3xl shadow-md">
        <div className="w-full grid grid-cols-3 gap-6 overflow-y-scroll h-[490px]">
          {classes.length > 0 ? (
            classes.map((classes) => (
              <div
                key={classes._id}
                className="bg-white p-4 rounded-[16px] shadow-md border-2 h-[250px] border-[#D1C7C74D] flex flex-col items-center space-x-4"
              >
                <div className="w-full">
                  <h3 className="text-lg font-bold">{classes.title}</h3>
                  <p className="text-gray-600 h-[60px] text-sm my-2">
                    {classes.description.length > 100
                      ? classes.description.slice(0, 100) + "..."
                      : classes.description}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="text-base text-black font-bold">Timings:</span> <span></span>{classes.timings}
                  </p>
                  <p className="text-gray-500 text-sm">
                   <span className="text-base text-black font-bold">Class Days: </span> <span></span>{classes.classesDays}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="text-base text-black font-bold">Location:</span> {classes.location}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => openEditPopup(classes._id)}
                      className="bg-orange-500 text-white px-4 py-1 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteClasses(classes._id)}
                      className="bg-[#feecce] text-orange-500 px-4 py-1 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No classes found.</p>
          )}
        </div>
      </div>
      <EditClassPopup
        classId={selectedClassId}
        isOpen={isPopupOpen}
        onClose={closeEditPopup}
        refreshClasses={refreshClasses}
      />
    </div>
  );
};

export default ShowClasses;
