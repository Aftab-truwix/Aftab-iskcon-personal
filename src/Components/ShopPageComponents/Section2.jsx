import React, { useEffect, useState } from 'react';
import Category1 from '../../assets/category1.webp';
import Category2 from '../../assets/grocery.webp';
import Category3 from '../../assets/category3.webp';
import Category4 from '../../assets/category4.webp';
import Category5 from '../../assets/cloth.webp'; // New category icon for Clothes
import Border1 from '../../assets/section1border1.webp';
import Border2 from '../../assets/section1border2.webp';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const backend = import.meta.env.VITE_BACKEND_URL;

function Section2() {
    const [scrollY, setScrollY] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        { id: 1, image: Category1, categoryName: "Books" },
        { id: 3, image: Category3, categoryName: "Flowers" },
        { id: 4, image: Category4, categoryName: "Puja Thali" },
        { id: 5, image: Category5, categoryName: "Clothes" } // New category added
    ];

    async function fetchProducts() {
        try {
            const response = await axios.get(`${backend}/admin/product/all`);
            setProducts(response.data.data);
            setFilteredProducts(response.data.data); // Show all products initially
        } catch (error) {
            console.error("Error while fetching products", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/all-products");
    };

    return (
        <>
            <div className='w-full h-auto flex flex-col px-5 py-6 gap-8 md:py-10 xl:py-14'>
                <h1 className='text-center font-prata text-xl lg:text-2xl'>Shop By Category</h1>
                <div className='w-full h-auto flex flex-col sm:flex-row sm:flex-wrap justify-center items-center overflow-hidden gap-7'>
                    {categories.map((item) => (
                        <a href='#products' key={item.id} className='w-[250px] h-auto flex flex-col gap-4 cursor-pointer'
                            onClick={() => setSelectedCategory(item.categoryName)}>
                            <div className={`w-full h-[250px] rounded-full flex justify-center items-center relative 
                                ${selectedCategory === item.categoryName ? "border-4 border-[#bf9d78]" : ""}`}>
                                <div className='w-[85%] h-[85%] border-[10px] rounded-full border-[#bf9d78] relative flex justify-center items-center overflow-hidden'>
                                    <div className='w-full h-full flex flex-col justify-center items-center relative py-3 gap-3 z-30'>
                                        <img src={item.image} alt={item.categoryName} className='mx-auto w-auto h-40' />
                                    </div>
                                    <img src={Border2} alt="border 2" className='w-full h-full absolute' />
                                </div>
                                <img src={Border1} alt="border 1" className='w-full h-full absolute'
                                    style={{
                                        transform: `rotate(${scrollY}deg)`,
                                        transition: "transform 5s linear",
                                    }} />
                            </div>
                            <p className={`w-full h-auto text-center font-nunito font-semibold text-xl 
                                ${selectedCategory === item.categoryName ? "text-[#bf9d78]" : ""}`}>
                                {item.categoryName}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            <div id='products' className='w-full h-auto flex flex-col bg-[#fde3b6] px-5 md:px-10 xl:px-20 py-8 md:py-14 xl:py-20'>
                <div className='w-full h-auto flex justify-between items-center text-lg sm:text-xl md:text-2xl'>
                    <span className='font-prata'>Best Sellers</span>
                    <button onClick={handleClick} className='font-nunito'>View all</button>
                </div>
                <div className='w-full h-auto mt-10 md:mt-20 grid grid-cols-1 sm:grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <ProductCard key={item._id} productId={item._id} productImage={item.images[0]} productName={item.name} productPrice={item.price} productDesc={item.subDesc} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600">No products available in this category.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Section2;
