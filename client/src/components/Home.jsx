import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useGetAllProductsQuery, useGetCArouselQuery } from '../redux/apis/userApi';
// import Footer from './Footer';
import { usefilter } from '../App';
import { toast } from 'sonner';
import { useGetAllProductsQuery, useGetCArouselQuery, useLazyGetFilteredDataQuery } from '../redux/apis/openApi';

const Home = () => {
    const { selectedType } = usefilter()
    const [allProducts, setAllProducts] = useState()
    // console.log(selectedType);

    let [filter, { data: filteredData, isSuccess, isError, error }] = useLazyGetFilteredDataQuery()//<= we type here
    // console.log(filteredData);

    useEffect(() => {
        if (selectedType) {
            filter(selectedType)
        }
    }, [selectedType, filter])

    useEffect(() => {
        if (isError) {
            toast.error(error)
        }
    }, [isError])


    const { data: products, isSuccess: mainData } = useGetAllProductsQuery();
    const { data: carousel = [] } = useGetCArouselQuery();

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (carousel.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carousel.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [carousel]);

    useEffect(() => {
        if (isSuccess) {
            setAllProducts(filteredData)
        }
    }, [isSuccess, filteredData])
    useEffect(() => {
        if (mainData) {
            setAllProducts(products)
        }
    }, [mainData])




    return (
        <div className='bg-light-golden'>
            <div className='mx-3'>
                <div className="relative w-full h-80 overflow-hidden rounded-md">
                    {/* Carousel container */}
                    <div className="relative w-full h-full">
                        {carousel.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`absolute w-full h-full ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: index === currentSlide ? 1 : 0 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                            >

                                <img
                                    src={item.image}
                                    className="w-full h-full object-cover"
                                    alt={`Slide ${index + 1}`}
                                />

                                <div className="absolute inset-0 flex items-center justify-start p-6 bg-gradient-to-r from-black via-transparent to-black opacity-50">
                                    <motion.div
                                        className="text-white bg-black bg-opacity-60 p-4 rounded-lg"
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -100, opacity: 0 }}
                                        transition={{ duration: 1, ease: 'easeInOut' }}
                                    >
                                        <h2 className="text-4xl font-bold mb-4">{item.mainHeading}</h2>
                                        <p className="text-lg">{item.paragraph}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <section>
                    <div className="container mx-auto flex flex-col items-center px-6 py-4">
                        <nav id="store" className="w-full z-0 top-0 px-6 py-1">
                            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                                <a className="z-10 uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl" href="#">
                                    Store
                                </a>
                                <div className="flex items-center" id="store-nav-content">
                                    <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                                        </svg>
                                    </a>
                                    <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                        <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </nav>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                            {allProducts && allProducts.map(item => (
                                <Link
                                    key={item._id}
                                    to={`/details/${item._id}`}
                                    className="transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <img className="h-48 w-full object-cover object-center duration-300 hover:scale-110" src={item.image} alt="Product Image" />
                                    <div className="p-4">
                                        <h2 className="mb-2 text-lg font-medium text-gray-900">{item.name}</h2>
                                        <p className="mb-2 text-base text-gray-700">{item.desc}</p>
                                        <div className="flex items-center">
                                            <p className="mr-2 text-lg font-semibold text-gray-900">${item.price}</p>
                                            <p className="text-base font-medium text-gray-500 line-through">${item.mrp}</p>
                                            <p className="ml-auto text-base font-medium text-green-500">${item.discount} off</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
}

export default Home;
