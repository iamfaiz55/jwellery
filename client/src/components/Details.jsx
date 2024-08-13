import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddCartMutation, useGetDetailsQuery } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Details = () => {
    const { id } = useParams();
    const { data } = useGetDetailsQuery(id);
    const navigate = useNavigate();
    const [addToCart, { isSuccess }] = useAddCartMutation()
    const { user } = useSelector(state => state.userData)

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cart Add Success")
        }
    }, [isSuccess])


    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-light-golden">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap lg:flex-nowrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6">
                        <img
                            alt="ecommerce"
                            className="lg:w-full w-full object-cover object-center rounded border border-gray-200"
                            src={data.image || 'default-image-url'} // Fallback to a default image if not available
                        />
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">IAMFAIZ55</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data.name || 'Product Name'}</h1>
                        <div className="flex mb-4">
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <a className="text-gray-500">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-2 text-gray-500">
                                    <svg
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{data.desc || 'Product description here'}</p>
                        <div className="flex flex-wrap mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className="flex flex-wrap items-center">
                                <span className="mr-3">{data.productType || 'Type'}</span>
                                {/* Quantity Selector */}
                                {/* Add quantity selector if needed */}
                            </div>
                            <div className="flex flex-wrap ml-6 items-center">
                                <span className="mr-3">{data.height || 'Height'}</span>
                                <span className="mr-3">{data.width || 'Width'}</span>
                                <h4 className="mr-3">{data.productWeight || 'Weight'}</h4>
                                <div className="relative">
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <span className="title-font font-medium text-2xl text-gray-900 mr-4">${data.price || 'Price'}</span>
                            <button
                                onClick={() => navigate(`/user/checkout/${data._id}`)}
                                className="flex ml-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                            >
                                Buy
                            </button>
                            <button
                                onClick={e => addToCart({ pId: data._id, uId: user._id })}
                                className="flex ml-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                            >
                                Add to Cart
                            </button>
                            <button className="flex ml-4 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Details;
