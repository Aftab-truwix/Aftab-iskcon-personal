import blogbg from "../../assets/blogbg.webp";
import { useEffect, useState } from "react";
import DonationCircle from "../DonationCircle.jsx";

import axios from "axios";
import BgOne from "../../assets/bg2.webp";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedEvents, setSearchedEvents] = useState([]);

  async function fetchEvents() {
    try {
      const response = await axios.get(`${backend}/admin/event/get`);
      setEvents(response.data.data.reverse());
    } catch (error) {
      console.log("Error while fetching Events", error);
    }
  }

  function handleChange(e) {
    setSearch(e.target.value);
    const filteredEvents = events.filter((events) =>
      events.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchedEvents(filteredEvents);
  }

  function formatDate(dateString) {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    let year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEvents();
  }, []);

  return (
    <div
      className="bg-[#fde5bc] w-full h-full"
      style={{
        backgroundImage: `url(${BgOne})`,
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="mt-10">
        <div className="w-full h-[300px] rounded-3xl relative -z-1 overflow-hidden px-4 md:px-20 ">
          <img
            src={blogbg}
            alt="blog background"
            effect="blur"
            className="w-full h-full rounded-3xl object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl mx-4 md:mx-20  "></div>
        </div>

        <div>
          <div className=" mx-auto py-8 px-5 md:px-10 lg:px-20">
            {/* Trending Blogs */}
            <section className="px-0 md:px-4 mt-10">
              <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">
                <div className="w-full md:w-1/3 text-center md:text-start">
                  {search.length > 0 ? null : (
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#3B2106] mb-6 font-poppins">
                      Trending Events
                    </h2>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8 w-full md:w-2/3">
                  <div className="relative w-[90%] md:w-[60%] ">
                    <input
                      type="text"
                      placeholder="Search Events"
                      value={search}
                      onChange={(e) => handleChange(e)}
                      className="w-full px-4 py-2 border rounded-full shadow-sm "
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m2.1-6.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {search.length > 0 ? (
                <div className="w-full h-auto flex flex-col gap-4 lg:gap-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-[#3B2106] mb-6 font-poppins">
                    Searched Results :
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                    {searchedEvents.length > 0 ? (
                      searchedEvents?.map((event) => (
                        <NavLink
                          to={`/events/single-event/${event._id}`}
                          key={event._id}
                          className=" overflow-hidden cursor-pointer transform transition duration-500 ease-out hover:scale-105 font-prata"
                        >
                          <div className="rounded-lg ">
                            <LazyLoadImage
                              src={event.image[0]}
                              alt={event.title}
                              effect="blur"
                              className="w-full h-[250px] rounded-lg object-fit"
                            />
                          </div>

                          <div className="p-4">
                            <p className="text-sm text-[#4F4F4F]">
                              {formatDate(event?.startDate)} •{" "}
                              {formatDate(event?.endDate)}
                            </p>
                            <h3 className="text-lg font-bold mt-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-700 mt-2">
                              {event.description.length > 200
                                ? event.description.slice(0, 200) + "..."
                                : event.description}
                            </p>
                          </div>
                        </NavLink>
                      ))
                    ) : (
                      <div className="w-full h-[500px] col-span-3 flex justify-center items-center">
                        <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#3B2106] mb-6 font-poppins">
                          No results found
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
              {search.length > 0 ? (
                <h2 className="text-2xl md:text-3xl font-semibold text-[#3B2106] mb-6 font-poppins">
                  Trending Events
                </h2>
              ) : null}
              <div className="flex gap-10">
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
                  {events?.slice(0, 2)?.map((event) => (
                    <NavLink
                      to={`/events/single-event/${event._id}`}
                      key={event._id}
                      className=" overflow-hidden cursor-pointer transform transition duration-500 ease-out hover:scale-105 font-prata"
                    >
                      <div className="rounded-lg ">
                        <img
                          src={event.image[0]}
                          alt={event.title}
                          className="w-full h-[250px] rounded-lg object-fit"
                        />
                      </div>

                      <div className="p-4">
                        <p className="text-sm text-[#4F4F4F]">
                          {formatDate(event?.startDate)} •{" "}
                          {formatDate(event?.endDate)}
                        </p>
                        <h3 className="text-lg font-bold mt-2">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-2">
                          {event.description.length > 200
                            ? event.description.slice(0, 200) + "..."
                            : event.description}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
                <aside className="w-full md:w-1/3 md:block hidden">
                  <h2 className="text-3xl font-semibold mb-6 font-poppins">
                    Related Events
                  </h2>
                  <div className="space-y-4">
                    {events?.slice(9).map((event) => (
                      <NavLink
                        to={`/events/single-event/${event._id}`}
                        key={event._id}
                        className="flex items-center cursor-pointer space-x-4 font-prata"
                      >
                        <div className="w-[100px] md:w-[120px] h-20 md:h-24 lg:w-[150px]">
                          <img
                            src={event.image[0]}
                            alt={event.title}
                            className="w-full h-full object-fit rounded-lg"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold">{event.title}</h3>
                          <p className="text-sm text-[#4F4F4F] mt-3">
                            {formatDate(event?.startDate)} •{" "}
                            {formatDate(event?.endDate)}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </aside>
              </div>
            </section>

            {/* Latest Blogs */}
            <section className="w-full mt-12">
              <h2 className="text-3xl text-[#3B2106] font-semibold mb-6 font-poppins">
                Latest Events
              </h2>
              <div className="w-full flex flex-col md:flex-row gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full ">
                  {events?.slice(3, 9).map((event) => (
                    <NavLink
                      to={`/events/single-event/${event._id}`}
                      key={event._id}
                      className=" overflow-hidden cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 font-prata"
                    >
                      <div className="rounded-lg ">
                        <img
                          src={event.image[0]}
                          alt={event.title}
                          className="w-full h-[250px] object-fit rounded-lg"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-[#4F4F4F]">
                          {formatDate(event?.startDate)} •{" "}
                          {formatDate(event?.endDate)}
                        </p>
                        <h3 className="text-lg font-bold mt-2">
                          {event.title}
                        </h3>
                        <p
                          className="text-sm text-gray-700 mt-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              event.description.length > 200
                                ? event.description.slice(0, 200) + "..."
                                : event.description,
                          }}
                        ></p>
                      </div>
                    </NavLink>
                  ))}
                </div>
                {/* Related Blogs */}
                <aside className="w-full md:w-1/3 md:hidden">
                  <h2 className="text-3xl font-semibold mb-6 font-poppins">
                    Related Events
                  </h2>
                  <div className="space-y-4">
                    {events?.slice(9).map((event) => (
                      <NavLink
                        to={`/events/single-event/${event._id}`}
                        key={event._id}
                        className="flex items-center cursor-pointer space-x-4 font-prata"
                      >
                        <div className="w-[100px] md:w-[120px] h-20 md:h-24 lg:w-[150px]">
                          <img
                            src={event.image[0]}
                            alt={event.title}
                            className="w-full h-full object-fit rounded-lg"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold">{event.title}</h3>
                          <p className="text-sm text-[#4F4F4F] mt-3">
                            {formatDate(event?.startDate)} •{" "}
                            {formatDate(event?.endDate)}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </aside>
              </div>
            </section>
          </div>
        </div>

        {/* Donation Circles */}
        <DonationCircle />
      </div>
    </div>
  );
};

export default EventPage;
