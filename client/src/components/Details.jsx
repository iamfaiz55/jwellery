import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddCartMutation, useLikeMutation } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useGetDetailsQuery } from '../redux/apis/openApi';

const Details = () => {
    const { id } = useParams();
    const { data, isError: isDetailError, error: detailsError } = useGetDetailsQuery(id);
    // console.log(id);

    const navigate = useNavigate();
    const [addToCart, { isSuccess, isError: isAddError, error: addError }] = useAddCartMutation();
    const { user } = useSelector(state => state.userData);
    const [like, { isSuccess: likeSuccesss, isError, error }] = useLikeMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cart Add Success");
        }
    }, [isSuccess]);
    useEffect(() => {
        if (likeSuccesss) {
            toast.success("Liked Success");
        }
    }, [likeSuccesss]);
    useEffect(() => {
        if (isError) {
            toast.error(JSON.stringify(error.data.message));
        }
    }, [isError]);
    // console.log(detailsError);

    useEffect(() => {
        if (isAddError) {
            toast.error(addError.data.message)
        }
    }, [isAddError])

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-light-golden">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap lg:flex-nowrap">
                    {/* Product Image */}
                    <motion.div
                        className="lg:w-1/2 w-full lg:pr-10 lg:py-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            alt="ecommerce"
                            className="lg:w-full w-full object-cover object-center rounded-lg shadow-lg border border-gray-200"
                            src={data && data.image || 'default-image-url'}
                        />
                    </motion.div>
                    {/* Product Details */}
                    <motion.div
                        className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{data && data.brand || 'IAMFAIZ55'}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{data && data.name || 'Product Name'}</h1>
                        <div className="flex mb-4">
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                {/* Social Media Icons */}
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
                        <p className="leading-relaxed mb-6">{data && data.desc || 'Product description here'}</p>
                        <div className="flex flex-wrap mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className="flex flex-wrap items-center mb-4">
                                <span className="mr-3 text-lg font-medium">{data && data.productType || 'Type'}</span>
                                {/* Quantity Selector */}
                                {/* Add quantity selector if needed */}
                            </div>
                            <div className="flex flex-wrap ml-6 items-center">
                                <span className="mr-3 text-base">{data && data.height || 'Height'}</span>
                                <span className="mr-3 text-base">{data && data.width || 'Width'}</span>
                                <h4 className="mr-3 text-lg font-medium">{data && data.productWeight}</h4>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <span className="title-font font-medium text-2xl text-gray-900 mr-4">${data && data.price || 'Price'}</span>
                            <button
                                onClick={() => navigate(`/user/checkout/${data && data._id}`)}
                                className="flex ml-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                            >
                                Buy
                            </button>
                            <button
                                onClick={() => addToCart({ pId: data._id, uId: user && user._id })}
                                className="flex ml-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
                            >
                                Add to Cart
                            </button>
                            <button onClick={e => like({ pId: data && data._id, uId: user._id })} className="flex ml-4 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>

                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Details;
