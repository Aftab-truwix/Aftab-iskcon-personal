import React from 'react'
import CardBorder from '../../assets/cardBorder.webp'
import ProductBook from '../../assets/productBook.webp'
import ProductShadow from '../../assets/productShadow.webp'
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function ProductCard({ productImage, productName, productPrice, productDesc, productId }) {
    return (
        <div className='w-[300px] h-[440px] relative cursor-pointer md:hover:scale-105 duration-500 ease-in-out'>
            <NavLink to={`/shop/single-product/${productId}`} className='w-full h-[90%] flex flex-col relative bottom-0 mt-10 z-20'>
                <div className='w-full h-48 flex flex-col items-center relative'>
                    <img src={productImage} alt="book" className='w-36 h-48' />
                    <img src={ProductShadow} alt="shadow" className='w-60 h-20 absolute -bottom-10 -z-10' />
                </div>
                <div className='w-full h-auto flex flex-col px-6 mt-5 gap-2'>
                    <h1 className='font-prata text-lg'>{productName}</h1>
                    <p className='text-sm font-nunito text-[#667085]'>{productDesc.length > 60 ? productDesc.slice(0, 60) + '...' : productDesc.slice(0, 60)}</p>
                    <div className='w-full h-auto flex gap-2 items-center'>
                        <div className='w-auto h-auto flex gap-1 items-center'>
                            {
                                [1, 2, 3, 4, 5].map((item, index) => (
                                    <FaStar key={index} size={15} className='text-yellow-500' />
                                ))
                            }
                        </div>
                        <div className='w-auto h-auto flex gap-1 items-center text-sm text-[#666666] font-poppins'>
                            <span className='font-semibold'>4.5</span>
                            <span className=''>(17 Review)</span>
                        </div>
                    </div>
                    <p className='font-poppins font-semibold'>₹ {productPrice}</p>
                </div>
            </NavLink>
            <img src={CardBorder} alt="card border" className='w-full h-full absolute top-0' />
        </div>
    )
}

export default ProductCard