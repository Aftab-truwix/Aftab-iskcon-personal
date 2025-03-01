import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import EditEventsPopup from "../Admin-Dashboard/Events/EditEventsPopup";

const backend = import.meta.env.VITE_BACKEND_URL; // Define backend URL

const ShowEvents = () => {
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  function handleOpenPopup(event = null) {
    setCurrentEvent(event);
    setPopup(true);
  }

  // Fetch events
  async function fetchEvents() {
    try {
      const response = await axios.get(`${backend}/admin/event/get`);
      setEvents(response.data.data);
    } catch (error) {
      console.log("Error while fetching events", error);
    }
  }

  // Delete an event
  async function deleteEvent(id) {
    try {
      await axios.delete(`${backend}/admin/event/delete/${id}`);
      fetchEvents();
      alert("Event deleted successfully!");
    } catch (error) {
      console.log("Error while deleting event", error);
    }
  }

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="p-6 bg-white h-auto rounded-3xl shadow-md">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Events</h2>
          <button
            onClick={() => console.log("Add Event clicked")}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add Event
          </button>
        </div> */}

        {/* Events Grid */}
        <div className="grid grid-cols-2 gap-6 overflow-y-scroll h-[480px]">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white p-4 rounded-[16px] shadow-md border-2 border-[#D1C7C74D] flex flex-col items-center space-x-4"
              >
                {/* Event Image */}
                <div className="w-full h-full border-2 border-orange-500 overflow-hidden rounded-xl">
                  <img
                    src={event.image[0]}
                    alt={event.title}
                    className="w-full h-[200px] object-cover"
                  />
                </div>

                {/* Event Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{event.title.substring(0, 39)}</h3>
                  <p className="text-gray-600 text-sm my-2">
                    {event.description.length > 100
                      ? event.description.slice(0, 100) + "..."
                      : event.description}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleOpenPopup(event)}
                      className="bg-orange-500 text-white px-4 py-1 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="bg-[#feecce] text-orange-500 px-4 py-1 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No events found.</p>
          )}
        </div>
      </div>
      {popup && (
        <EditEventsPopup
          event={currentEvent}
          closePopup={() => setPopup(false)}
          refreshEvents={fetchEvents}
        />
      )}
    </div>
  );
};

export default ShowEvents;
