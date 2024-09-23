import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGetAllAddImagesQuery } from '../redux/apis/openApi';

const AddsImages = () => {
    // const images = [
    //     { image: "https://images.pexels.com/photos/3065096/pexels-photo-3065096.jpeg?auto=compress&cs=tinysrgb&w=600" },
    //     { image: "https://cdn.pixabay.com/photo/2016/10/16/12/28/mehndi-designs-1745048_1280.jpg" },
    //     { image: "https://cdn.pixabay.com/photo/2024/01/06/10/24/indian-8491082_1280.jpg" },
    //     { image: "https://cdn.pixabay.com/photo/2017/09/23/17/29/deepika-padukone-2779557_1280.jpg" },
    //     { image: "https://cdn.pixabay.com/photo/2024/01/25/00/32/ai-generated-8530801_1280.jpg" },
    //     { image: "https://cdn.pixabay.com/photo/2018/07/01/08/50/flower-3508963_1280.jpg" },
    //     { image: "https://cdn.pixabay.com/photo/2016/05/19/17/11/woman-1403458_1280.jpg" },
    //     { image: "https://cdn.pixabay.com/photo/2017/06/09/17/11/model-2387582_1280.jpg" }
    // ];
    const [fadeOut, setFadeOut] = useState(false);
    const { data: images = [] } = useGetAllAddImagesQuery();
    console.log(images); // Check if this outputs an array of image objects

    const [currentImages, setCurrentImages] = useState(images.slice(0, 6));
    const [imageIndex, setImageIndex] = useState(0);

    const replaceImageOneByOne = () => {
        setFadeOut(true);
        setTimeout(() => {
            setCurrentImages((prevImages) => {
                const availableImages = images.filter(img => !prevImages.includes(img.image));
                if (availableImages.length === 0) return prevImages; // No new images available

                const nextImage = availableImages[imageIndex % availableImages.length].image;
                const newImages = [...prevImages];
                newImages[imageIndex % newImages.length] = { image: nextImage };
                setImageIndex(prevIndex => (prevIndex + 1) % newImages.length);

                return newImages;
            });
            setFadeOut(false);
        }, 500);
    };

    useEffect(() => {
        if (images.length > 0) {
            setCurrentImages(images.slice(0, 6)); // Ensure to set initial images when data is available
        }
        const interval = setInterval(replaceImageOneByOne, 3000);
        return () => clearInterval(interval);
    }, [images]); // Trigger on images change


    return (
        <div className="container mx-auto p-20">
            {/* Large screen grid */}
            <div
                className="grid gap-4 hidden md:grid"
                style={{
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: 'repeat(3, 200px)',
                    gridAutoFlow: 'dense'
                }}
            >
                {currentImages && currentImages.map((src, index) => {
                    const isLarge = index % 3 === 0;

                    return (
                        <motion.div
                            key={index}
                            className={`rounded-lg overflow-hidden ${fadeOut ? 'fade-out' : 'fade-in'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                gridColumn: isLarge ? 'span 2' : 'span 1',
                                gridRow: isLarge ? 'span 2' : 'span 1'
                            }}
                        >
                            <img
                                className="h-full w-full object-cover rounded-lg"
                                src={src.image}
                                alt={`image-${index}`}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Small screen layout */}
            <div className="grid gap-4 md:hidden grid-cols-1 sm:grid-cols-2">
                {currentImages && currentImages.slice(0, 6).map((src, index) => (  // Limit to 6 images
                    <motion.div
                        key={index}
                        className={`rounded-lg overflow-hidden ${fadeOut ? 'fade-out' : 'fade-in'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            className="h-full w-full object-cover rounded-lg"
                            src={src.image}
                            alt={`image-${index}`}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Extra small screen layout */}
            <div className="grid gap-4 sm:hidden">
                {currentImages && currentImages.slice(0, 0).map((src, index) => (  // Limit to 6 images
                    <motion.div
                        key={index}
                        className={`rounded-lg overflow-hidden ${fadeOut ? 'fade-out' : 'fade-in'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            className="h-full w-full object-cover rounded-lg"
                            src={src.image}
                            alt={`image-${index}`}
                        />
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                .fade-out {
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }
                .fade-in {
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default AddsImages;
