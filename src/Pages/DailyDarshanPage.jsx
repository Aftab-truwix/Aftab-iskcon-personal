import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const backend = import.meta.env.VITE_BACKEND_URL;

function DailyDarshan() {
    const [media, setMedia] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedType, setSelectedType] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null); // ✅ Track selected image for popup

    // Date handling functions
    const handlePreviousDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDate = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        
        const today = new Date();
        // today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for accurate comparison
        // newDate.setHours(0, 0, 0, 0); // Normalize newDate to midnight
        
        // Prevent navigating to future dates
        if (newDate > today) {
            toast.dismiss()
            toast.error("Cannot select a future date.");
            return;
        }
        
        setSelectedDate(newDate);
    };

    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Media filtering logic
    const parseCreatedAt = (dateString) => {
        const [day, month, year] = dateString.split(' ')[0].split('-');
        return new Date(year, month - 1, day);
    };

    const isSameDate = (date1, date2) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    // Get unique types from media
    const mediaTypes = [...new Set(media.map(item => item.type))];

    const filteredMedia = media.filter(item =>
        isSameDate(parseCreatedAt(item.createdAt), selectedDate) &&
        (selectedType === 'all' || item.type === selectedType)
    );

    // Data fetching
    async function getAllMedia() {
        try {
            const response = await axios.post(`${backend}/admin/media/get-media-date`, {
                date: selectedDate
            });
            setMedia(response.data.data);
        } catch (error) {
            console.log("Error while fetching media", error);
        }
    }

    useEffect(() => {
        getAllMedia();
    }, [selectedDate]);

    return (
        <div className='w-full bg-gradient-to-b from-[#fde3b6] to-[#f8c56a] flex flex-col min-h-screen'>
            <div className="px-4 md:px-20 pt-4 relative z-50">
                <Navbar />
            </div>
            <div className='w-full h-full flex flex-col px-5 gap-6 md:px-10 lg:px-20 py-10 md:py-20'>
                <div className="flex flex-col gap-4 items-end justify-between">
                    {/* Type Selector */}
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
                    >
                        <option value="all" className="text-gray-700 font-medium">All Types</option>
                        {mediaTypes.map((type) => (
                            <option key={type} value={type} className="text-gray-700 font-medium">
                                {type}
                            </option>
                        ))}
                    </select>


                    {/* Date Navigation */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePreviousDate}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            ←
                        </button>
                        <span className="text-lg font-medium">
                            {formatDate(selectedDate)}
                        </span>
                        <button
                            onClick={handleNextDate}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Masonry Grid */}
                <div className='w-full h-auto gap-4 lg:gap-6'>
                    {filteredMedia.length === 0 ? (
                        <p className="text-gray-500 sm:text-lg lg:text-xl h-80 flex justify-center items-center">
                            No media found for {formatDate(selectedDate)} {selectedType !== 'all' && `of type ${selectedType}`}
                        </p>
                    ) : (
                        filteredMedia.map((mediaItem) => (
                            <div key={mediaItem._id} className="flex flex-col gap-4 mb-8 lg:gap-8">
                                <div className="flex flex-col">
                                    <h2 className="text-xl md:text-2xl font-semibold lg:text-4xl font-prata">{mediaItem.title}</h2>
                                    <span className="text-sm text-gray-500 lg:text-lg font-poppins">{mediaItem.type}</span>
                                </div>

                                {/* Masonry Grid */}
                                <div className="columns-2 md:columns-3 gap-4">
                                    {mediaItem.image.map((imgUrl, index) => (
                                        <div
                                            key={index}
                                            className="relative break-inside-avoid mb-4 cursor-pointer"
                                            onClick={() => setSelectedImage(imgUrl)} // ✅ Open popup on click
                                        >
                                            <img
                                                src={imgUrl}
                                                alt={`${mediaItem.title} ${index + 1}`}
                                                className="w-full h-auto object-cover rounded-lg shadow-md md:hover:scale-105 md:duration-500 md:ease-in-out"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* ✅ Popup Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50"
                    onClick={() => setSelectedImage(null)} // Close when clicking outside
                >
                    <button
                        className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-md text-lg"
                        onClick={() => setSelectedImage(null)}
                    >
                        ✖
                    </button>
                    <div className="relative p-4 max-w-3xl mx-auto">
                        <img
                            src={selectedImage}
                            alt="Selected media"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DailyDarshan;
