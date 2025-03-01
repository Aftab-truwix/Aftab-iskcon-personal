import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";

const backend = import.meta.env.VITE_BACKEND_URL;

export default function StoryViewer({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${backend}/admin/daily-story`);
        setStory(response.data.story); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
  
    fetchStories();
  }, []);

  useEffect(() => {
    if (!isPaused && story.length > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, story.length]);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1 < story.length ? prev + 1 : 0));
    setProgress(0);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : story.length - 1));
    setProgress(0);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const deltaX = touchEndX.current - touchStartX.current;
      if (deltaX > 50) {
        prevStory();
      } else if (deltaX < -50) {
        nextStory();
      }
    }
    setIsPaused(false);
    touchStartX.current = null;
    touchEndX.current = null;
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-[90vw] max-w-[500px] h-screen max-h-[800px] bg-white rounded-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 flex space-x-1 z-50">
          {story?.map((_, index) => (
            <div key={index} className="h-1 bg-gray-500 border border-gray-100 rounded-full flex-1">
              {index === currentIndex && (
                <div
                  className="h-1 bg-white  rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Left Click - Previous */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1/3"
          onClick={prevStory}
        ></div>

        {/* Story Content */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {story.length > 0 && story[currentIndex] ? (
            story[currentIndex].type === "image" ? (
              <img
                src={story[currentIndex].media}
                alt="Story"
                className="w-full h-full object-cover"
              />
            ) : (
              <ReactPlayer
                url={story[currentIndex].media}
                playing={!isPaused}
                width="100%"
                height="100%"
                loop={false}
                controls={false}
                onEnded={nextStory}
              />
            )
          ) : (
            <p className="text-white">Loading...</p>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          {/* Text Overlay */}
          {story.length > 0 && story[currentIndex] && (
            <>
              <div className="absolute bottom-60 w-full left-6 text-white text-3xl font-bold">
                {story[currentIndex].title}
              </div>
              <div className="w-[85%] absolute bottom-4 left-6  text-white text-sm">
                {story[currentIndex].description}
              </div>
            </>
          )}

          {/* Pause on Hold */}
          <div
            className="absolute inset-0"
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
          ></div>
        </div>

        {/* Right Click - Next */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3"
          onClick={nextStory}
        ></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-6   flex text-4xl  justify-center items-center z-50"
        >
         <IoIosCloseCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
}
