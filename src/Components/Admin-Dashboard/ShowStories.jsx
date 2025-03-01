import React, { useState, useEffect } from "react";
import axios from "axios";
import EditStoryPopup from "./EditStoryPopup";

const backend = import.meta.env.VITE_BACKEND_URL; // Define backend URL

const ShowStories = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleEditClick = (story) => {
    setSelectedStory(story); // Set the selected story
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedStory(null);
  };

  // Fetch stories
  async function fetchStories() {
    try {
      const response = await axios.get(`${backend}/admin/daily-story`);
      console.log(response.data.story);
      setStories(response.data.story);
    } catch (error) {
      console.log("Error while fetching stories:", error);
    }
  }

  // Delete a story
  async function deleteStory(id) {
    try {
      await axios.delete(`${backend}/admin/daily-story/delete/${id}`);
      fetchStories(); // Refresh the list after deletion
      alert("Story deleted successfully!");
    } catch (error) {
      console.log("Error while deleting story:", error);
    }
  }

  // Fetch stories on component mount
  useEffect(() => {
    fetchStories();
  }, []);

  console.log(stories);
  return (
    <div>
      <div className="p-6 bg-white h-auto rounded-3xl shadow-md">
        {/* Events Grid */}
        <div className="grid grid-cols-2 gap-6 overflow-y-scroll h-[400px]">
          {stories?.length > 0 ? (
            stories?.map((story) => (
              <div
                key={story._id}
                className="bg-white p-4 rounded-[16px] h-[200px] shadow-md border-2 border-[#D1C7C74D] flex  items-center space-x-4"
              >
                {/* story Image */}
                <div className="w-1/2 h-full border-2 border-orange-500 p-1 rounded-xl">
                  <img
                    src={story.media}
                    alt={story.title}
                    className="w-full h-full object-fit"
                  />
                </div>

                {/* story Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{story.title}</h3>
                  <p className="text-gray-600 text-sm my-2">
                    {story.description.length > 100
                      ? story.description.slice(0, 100) + "..."
                      : story.description}
                  </p>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEditClick(story)}
                      className="bg-orange-500 text-white px-4 py-1 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStory(story._id)}
                      className="bg-[#feecce] text-orange-500 px-4 py-1 rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No Stories found.</p>
          )}
        </div>
      </div>
      {isPopupOpen && (
        <EditStoryPopup
          story={selectedStory}
          onClose={handleClosePopup} // Pass function to close popup
        />
      )}
    </div>
  );
};

export default ShowStories;
