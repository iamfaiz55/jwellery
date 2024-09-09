import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usefilter } from '../App';
import { toast } from 'sonner';
import { useGetAllProductsQuery, useGetCArouselQuery, useGetTaxesQuery, useLazyGetFilteredDataQuery } from '../redux/apis/openApi';

const Home = () => {
    const { selectedType } = usefilter();
    const [allProducts, setAllProducts] = useState([]);
    const { data: taxes } = useGetTaxesQuery();
    console.log(taxes);

    let [filter, { data: filteredData, isSuccess, isError, error }] = useLazyGetFilteredDataQuery();

    useEffect(() => {
        if (selectedType) {
            filter(selectedType);
        }
    }, [selectedType, filter]);

    useEffect(() => {
        if (isError) {
            toast.error(error);
        }
    }, [isError]);

    const { data: products, isSuccess: mainData } = useGetAllProductsQuery();
    const { data: carousel = [] } = useGetCArouselQuery();

    const [currentSlide, setCurrentSlide] = useState(0);

    // Get the discount percentage from the taxes array
    const discountTax = taxes && taxes.find(tax => tax.taxName === "Discount");

    // Apply discount if available
    const applyDiscount = (price) => {
        if (discountTax) {
            const discountAmount = (price * discountTax.percent) / 100;
            return price - discountAmount;
        }
        return price; // No discount applied
    };

    useEffect(() => {
        if (carousel.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carousel.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [carousel]);

    useEffect(() => {
        if (isSuccess) {
            setAllProducts(filteredData);
        }
    }, [isSuccess, filteredData]);

    useEffect(() => {
        if (mainData) {
            setAllProducts(products);
        }
    }, [mainData]);

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
                                            <p className="mr-2 text-lg font-semibold text-gray-900">${applyDiscount(item.price)}</p>
                                            <p className="text-base font-medium text-gray-500 line-through">${item.mrp}</p>
                                            <p className="ml-auto text-base font-medium text-green-500">{item.discount} off</p>
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
