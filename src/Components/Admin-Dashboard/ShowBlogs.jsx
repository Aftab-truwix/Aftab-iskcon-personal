import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import EditBlogsPopup from "../Admin-Dashboard/Blogs/EditBlogsPopup";

const backend = import.meta.env.VITE_BACKEND_URL; // Define backend URL

const ShowBlogs = () => {
  const [currentBlog, setCurrentBlog] = useState(null);
  const [popup, setPopup] = useState(false);

  const [blogs, setBlogs] = useState([]);

  function handleOpenPopup(blog = null) {
    setCurrentBlog(blog);
    setPopup(true);
  }
  // Fetch events
  async function fetchBlogs() {
    try {
      const response = await axios.get(`${backend}/admin/blog/get`);
      setBlogs(response.data.data);
    } catch (error) {
      console.log("Error while fetching blogs", error);
    }
  }

  async function deleteBlog(id) {
    try {
      await axios.delete(`${backend}/admin/blog/delete/${id}`);
      fetchBlogs();
      alert("Blog deleted successfully!");
    } catch (error) {
      console.log("Error while deleting blog", error);
    }
  }

  useEffect(() => {
    fetchBlogs();
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
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded-[16px] shadow-md border-2 border-[#D1C7C74D] flex flex-col items-center space-x-4"
              >
                {/* blog Image */}
                <div className="w-full h-full border-2 border-orange-500 overflow-hidden rounded-xl">
                  <img
                    src={blog.image[0]}
                    alt={blog.title}
                    className="w-full h-[200px] object-cover"
                  />
                </div>

                {/* blog Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{blog.title.substring(0, 39)}</h3>
                  <p className="text-gray-600 text-sm my-2">
                    {blog.description.length > 100
                      ? blog.description.slice(0, 100) + "..."
                      : blog.description}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleOpenPopup(blog)}
                      className="bg-orange-500 text-white px-4 py-1 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBlog(blog._id)}
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
        <EditBlogsPopup
          blog={currentBlog}
          closePopup={() => setPopup(false)}
          refreshBlogs={fetchBlogs}
        />
      )}
    </div>
  );
};

export default ShowBlogs;
