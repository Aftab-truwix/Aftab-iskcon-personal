import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import DonationCircle from '../Components/DonationCircle';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
const backend = import.meta.env.VITE_BACKEND_URL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY 
const CHANNEL_ID = import.meta.env.VITE_CHANNEL_ID


function LiveDarshan() {
  const [liveVideoId, setLiveVideoId] = useState(null);

  async function getLiveVideoId() {
    try {
      // Step 1: Check if there is a live stream currently happening
      const liveResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`
      );

      if (liveResponse.data.items.length > 0) {
        // If live, set the live video ID
        setLiveVideoId(liveResponse.data.items[0].id.videoId);
      } else {
        // Step 2: If no live stream, fetch the most recent completed live stream
        const completedLiveResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=completed&type=video&key=${YOUTUBE_API_KEY}&order=date&maxResults=1`
        );

        if (completedLiveResponse.data.items.length > 0) {
          // Set the most recent completed live stream video ID
          setLiveVideoId(completedLiveResponse.data.items[0].id.videoId);
        } else {
          // If no live or completed live streams are found, show a message
          setLiveVideoId(null);
        }
      }
    } catch (error) {
      toast.dismiss()
      console.log("Error while fetching live video", error);
      toast.error("Failed to fetch live video!");
    }
  }

  useEffect(() => {
    getLiveVideoId();
  }, []);

  return (
    <div className='w-full h-auto flex flex-col bg-[#fde3b6]'>
      <div className="px-4 md:px-20 pt-4 relative z-50">
        <Navbar />
      </div>
      <div className='w-full h-auto px-5 md:px-10 lg:px-20 my-10 lg:my-20'>
        <h1 className='font-prata text-lg md:text-2xl xl:text-3xl font-semibold'>Live Darshan</h1>
        {
          liveVideoId
            ? <div className='w-full h-80 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] mt-5 lg:mt-8'>
              <iframe
                src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1`}
                title="YouTube Video"
                className="w-full h-full"
                allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="origin"
              ></iframe>
            </div>
            : <div className='w-full h-80 sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] mt-5 lg:mt-8 bg-black blur-sm flex justify-center items-center'>
            <ClipLoader color="#ffffff" loading={true} size={50} />
          </div>
        }
      </div>
      <DonationCircle />
    </div>
  );
}

export default LiveDarshan;