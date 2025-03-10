import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const backend = import.meta.env.VITE_BACKEND_URL;

function AdminSingleService() {
    const [singleService, setSingleService] = useState({});
    const [images, setImages] = useState([])
    const { id } = useParams()

    async function fetchSingleService() {
        try {
            const response = await axios.get(`${backend}/admin/service/get/${id}`);
            setSingleService(response.data.data);
            setImages(response.data.data.image)
        } catch (error) {
            console.log("Error while fetching single service", error);
        }
    }


    useEffect(() => {
        fetchSingleService();
    }, [id])

    return (
        <div className='w-full h-auto flex flex-col my-10 px-5 md:px-10 lg:px-20'>
            <img src={images[0]} alt="" className='w-full h-40 rounded-lg bg-gray-200 sm:h-60 md:h-80 lg:h-[400px] object-cover xl:h-[550px]' />
            <h1 className='my-4 lg:my-6 w-full h-auto text-xl sm:text-2xl md:text-3xl xl:text-4xl font-semibold'>{singleService.title}</h1>
            <p style={{ whiteSpace: "pre-wrap" }} className='w-full h-auto text-sm text-gray-500 sm:text-base lg:text-lg'>
                {singleService.description}
            </p>
        </div>
    )
}

export default AdminSingleService