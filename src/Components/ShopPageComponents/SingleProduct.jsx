import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import BgOne from '../../assets/bg2.webp'
import Navbar from '../Navbar'
import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa";
import Icon1 from '../../assets/singleProductIcon1.webp'
import Icon2 from '../../assets/singleProductIcon2.webp'
import Icon3 from '../../assets/singleProductIcon3.webp'
import Icon4 from '../../assets/singleProductIcon4.webp'
import axios from 'axios'
import ProductCard from './ProductCard'
import { CartContext } from '../../Context/CartContext'
import { toast } from "react-toastify";


const backend = import.meta.env.VITE_BACKEND_URL;

function SingleProduct() {
    const [singleProduct, setSingleProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [images, setImages] = useState([]);
    const { addToCart, cartItems, removeFromCart } = useContext(CartContext);
    const [mainImage, setMainImage] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pincode, setPincode] = useState(0)
    const [isPincode, setIsPincode] = useState(false)
    const { id } = useParams()
    const sliderRef = useRef(null);

    async function fetchSingleProduct() {
        try {
            const response = await axios.get(`${backend}/admin/product/${id}`);
            setSingleProduct(response.data.data);
            setImages(response.data.data.images)
            setMainImage(response.data.data.images[0])
        } catch (error) {
            console.log("Error while fetching single product", error);
        }
    }

    async function fetchProducts() {
        try {
            const response = await axios.get(`${backend}/admin/product/all`);
            setRelatedProducts(response.data.data.slice(0, 4));
        } catch (error) {
            console.log("Error while fetching products", error);
        }
    }

    function handleAddToCart() {
        const isInCart = cartItems.find(item => item.id === singleProduct._id);
        if (!isInCart) {
            addToCart({
                id: singleProduct._id,
                name: singleProduct.name,
                price: singleProduct.price,
                image: singleProduct.images[0],
                category: singleProduct.category,
                quantity: 1

            })
            toast.dismiss();
            toast.success("Product added to cart successfully!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === "" || (Number(value) >= 0 && !value.startsWith("0"))) {
            e.target.value = value;
        } else {
            e.target.value = value.replace(/[^0-9]/g, '');
        }
    };

    function validatePincode() {
        const pincodePattern = /^\d{6}$/;
        toast.dismiss()

        if (!pincode) {
            toast.error("Pincode is required!");
            return false;
        }

        if (!pincodePattern.test(pincode)) {
            toast.error("Invalid pincode! Must be 6 digits.");
            return false;
        }
        setIsPincode(true)
        setTimeout(() => {
            setIsPincode(false)
            setPincode(0)
        }, 5000);
        return true;
    }

    // Handle next image
    const handleNext = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        setMainImage(images[newIndex]);
    };

    // Handle previous image
    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
        setMainImage(images[newIndex]);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSingleProduct();
        fetchProducts()
    }, [id])

    return (
        <>
            <div
                className="w-full h-auto flex flex-col bg-[#fde5bc]"
                style={{
                    backgroundImage: `url(${BgOne})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <div className="px-4 md:px-20 pt-4 pb-10 relative z-50">
                    <Navbar />
                </div>
                <div className='w-full h-auto flex flex-col px-5 md:px-10 xl:px-20 md:flex-row md:justify-between'>
                    <div className='w-full h-auto flex flex-col gap-2 md:w-[45%] md:px-5 lg:w-[450px] xl:w-[550px]'>
                        <div className='w-full h-auto flex flex-col gap-2 pb-8 md:gap-4'>
                            <div className='w-full h-auto rounded-2xl overflow-hidden sm:w-[70%] sm:mx-auto md:w-full'>
                                <img src={mainImage} alt="product Image" className='w-full h-[500px] rounded-2xl object-cover' />
                            </div>
                            {images.length > 1 && (
                                <div className='w-full flex justify-between items-center sm:w-[70%] md:w-full'>
                                    {/* Left Arrow */}
                                    <span onClick={handlePrev}>
                                        <FaChevronLeft size={20} className='text-black cursor-pointer' />
                                    </span>

                                    {/* Image Thumbnails */}
                                    <div className='w-full flex-1 scroll-smooth overflow-x-scroll flex gap-1 md:gap-3' style={{ scrollbarWidth: 'none' }}>
                                        {images.map((item, index) => (
                                            <img
                                                key={index}
                                                src={item}
                                                alt={`Thumbnail ${index + 1}`}
                                                className={`w-24 h-20 object-cover rounded-xl md:h-24 xl:w-[107px] xl:h-[110px] cursor-pointer ${mainImage === item ? 'border-2 border-[#EB852C]' : ''
                                                    }`}
                                                onClick={() => {
                                                    setMainImage(item);
                                                    setCurrentIndex(index);
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Right Arrow */}
                                    <span onClick={handleNext}>
                                        <FaChevronRight size={20} className='text-black cursor-pointer' />
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-col gap-1 md:gap-2 xl:gap-3 pb-8 md:w-[55%]'>
                        <h1 className='text-[#1E1E1E] font-poppins md:text-3xl xl:text-4xl'>{singleProduct?.name}</h1>
                        <h1 className='font-poppins flex gap-1 items-center md:text-lg xl:text-2xl'>
                            <span className='text-[#111111] font-semibold'>₹ {singleProduct?.price}</span>
                            <span className='text-sm md:text-base xl:text-lg'>60% off</span>
                        </h1>
                        <p className='font-poppins text-[#00000080] line-through md:text-lg xl:text-2xl'>₹ 5500.00</p>
                        <p className='font-poopins text-[#686363] text-sm md:text-base'>{singleProduct?.subDesc}</p>
                        <div className='w-full h-auto flex flex-col gap-3 items-center mt-5 sm:flex-row'>
                            <button onClick={handleAddToCart} className='w-60 py-1.5 bg-[#EB852C] text-white font-poppins rounded-3xl font-semibold sm:w-80 xl:py-3'>
                                {
                                    cartItems.find(item => item.id === singleProduct._id)
                                        ? (
                                            <div className='w-full h-full flex justify-center items-center gap-3'>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeFromCart({
                                                            id: singleProduct._id,
                                                            name: singleProduct.name,
                                                            price: singleProduct.price,
                                                            image: singleProduct.images[0],
                                                            category: singleProduct.category,
                                                            quantity: 1
                                                        });
                                                    }}
                                                    className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                                                >
                                                    -
                                                </span>
                                                <span className="font-semibold xl:text-lg">
                                                    {cartItems.find(item => item.id === singleProduct._id).quantity}
                                                </span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToCart({
                                                            id: singleProduct._id,
                                                            name: singleProduct.name,
                                                            price: singleProduct.price,
                                                            image: singleProduct.images[0],
                                                            category: singleProduct.category,
                                                            quantity: 1

                                                        })
                                                    }}
                                                    className="w-4 h-4 flex justify-center items-center rounded-full border border-white sm:w-5 sm:h-5 cursor-pointer select-none"
                                                >
                                                    +
                                                </span>
                                            </div>
                                        )
                                        : 'Add to Cart'
                                }
                            </button>
                            {/* <button className='w-40 py-1.5 bg-[#FDFDFD] text-[#999999] border border-[#ECA242] font-poppins rounded-3xl flex justify-center items-center gap-2 xl:py-3 xl:w-48'>
                                <MdKeyboardArrowDown size={20} />
                                <span>Wishlist</span>
                            </button> */}
                        </div>
                        <div className='w-full h-auto flex flex-col gap-3 mt-4 xl:mt-8'>
                            <h1 className='text-[#1A1A1A] font-poppins font-semibold md:text-lg xl:text-xl'>Check for Delivery Details</h1>
                            <div className='w-full h-10 bg-white flex justify-between items-center rounded-xl px-3 md:w-[300px] xl:w-[400px]'>
                                <input type="number" value={pincode} onWheel={(e) => e.currentTarget.blur()} onChange={(e) => setPincode(e.target.value)} placeholder='Enter Pincode' min={0} className="w-full rounded-l-xl h-full outline-none flex-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
                                <button onClick={validatePincode} className='text-sm font-poppins'>Check</button>
                            </div>
                            <div className='w-full h-auto flex gap-1 items-center mt-3 xl:gap-3'>
                                <RiTruckLine size={20} className='md:size-7' />
                                <p className='font-poppins text-xs md:text-sm'>Enter Pincode for Estimated Delivery Date</p>
                            </div>
                            {
                                isPincode && (
                                    <div className='w-full h-auto flex gap-1 text-green-500 items-center xl:gap-3'>
                                        {/* <FaRegCalendar size={20} className='md:size-6' /> */}
                                        <p className='font-poppins text-sm'>We Deliver at this Pincode <br />Estimated Delivery Time 3 to 4 Days</p>
                                    </div>
                                )
                            }
                        </div>
                        <div className='w-full h-auto flex flex-col gap-3 mt-5 font-poppins'>
                            <h1 className='text-[#344054] font-medium text-lg xl:text-2xl'>Product Description</h1>
                            <p className='text-sm md:text-base xl:text-lg'>{singleProduct?.description}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto flex flex-wrap bg-white px-5 md:px-10 lg:px-20 justify-center items-center gap-3 py-5 xl:gap-10 md:py-10'>
                    <div className='w-[300px] flex gap-4 h-auto p-5'>
                        <img src={Icon1} alt="icon1" className='w-10 h-10 object-cover flex-shrink-0' />
                        <div className='w-full h-auto flex flex-col font-prata text-[#484848]'>
                            <span className='text-lg lg:text-xl'>High Quality</span>
                            <span className='text-sm lg:text-base'>crafted from top materials</span>
                        </div>
                    </div>
                    <div className='w-[300px] flex gap-4 h-auto p-5'>
                        <img src={Icon2} alt="icon2" className='w-10 h-10 object-cover flex-shrink-0' />
                        <div className='w-full h-auto flex flex-col font-prata text-[#484848]'>
                            <span className='text-lg lg:text-xl'>Warranty Protection</span>
                            <span className='text-sm lg:text-base'>Over 2 years</span>
                        </div>
                    </div>
                    <div className='w-[300px] flex gap-4 h-auto p-5'>
                        <img src={Icon3} alt="icon3" className='w-10 h-10 object-cover flex-shrink-0' />
                        <div className='w-full h-auto flex flex-col font-prata text-[#484848]'>
                            <span className='text-lg lg:text-xl'>Free Shipping</span>
                            <span className='text-sm lg:text-base'>Order over Rs 150</span>
                        </div>
                    </div>
                    <div className='w-[300px] flex gap-4 h-auto p-5'>
                        <img src={Icon4} alt="icon4" className='w-10 h-10 object-cover flex-shrink-0' />
                        <div className='w-full h-auto flex flex-col font-prata text-[#484848]'>
                            <span className='text-lg lg:text-xl'>24 / 7 Support</span>
                            <span className='text-sm lg:text-base'>Dedicated support</span>
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto flex flex-col px-5 md:px-10 xl:px-20 my-10'>
                    <h1 className='font-prata font-semibold text-xl lg:text-2xl'>Related Products</h1>
                    <div className='w-full h-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center'>
                        {
                            relatedProducts.map((product, index) => <ProductCard key={index} productImage={product.images[0]} productName={product.name} productId={product._id} productPrice={product.price} productDesc={product.subDesc} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct