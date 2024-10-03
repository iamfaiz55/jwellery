import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddCartMutation, useGetReviewsQuery, useLikeMutation, usePostReviewMutation } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useGetDetailsQuery, useGetTaxesQuery } from '../redux/apis/openApi';
import { useProduct } from '../App';

const Details = () => {
    const { selectedProd, setselectedProd } = useProduct()
    const { id } = useParams();
    const { data: reviews } = useGetReviewsQuery(id);
    const { data, isError: isDetailError, error: detailsError } = useGetDetailsQuery(id);
    const { data: taxes } = useGetTaxesQuery();
    const [liked, setLiked] = useState(false);

    const navigate = useNavigate();
    const [addToCart, { isSuccess, isError: isAddError, error: addError }] = useAddCartMutation();
    const { user } = useSelector((state) => state.userData);
    const [like, { isSuccess: likeSuccesss, isError, error }] = useLikeMutation();

    const [currentImage, setCurrentImage] = useState(data?.images[0] || 'default-image-url');
    const [selectedVariant, setSelectedVariant] = useState(data?.varient[0] || {});

    useEffect(() => {
        if (data && data.images.length > 0) {
            setCurrentImage(data.images[0]);
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            setSelectedVariant(data.varient[0]);
        }
    }, [data]);

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

    useEffect(() => {
        if (isAddError) {
            toast.error(addError.data.message);
        }
    }, [isAddError]);

    const discountedPrice = (price) => {
        let discountedPrice = price;
        const discountTax = taxes?.find((tax) => tax.taxName === "Discount");
        if (discountTax) {
            const discountPercent = discountTax.percent;
            discountedPrice -= discountedPrice * (discountPercent / 100);
        }
        return discountedPrice;
    };

    const calculateRating = () => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const renderStars = (rating) => {
        const maxRating = 5;
        let stars = [];

        for (let i = 1; i <= maxRating; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i <= Math.floor(rating) ? "#fbbf24" : "none"}
                    stroke="currentColor"
                    className="w-5 h-5"
                >
                    <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2l3.17 6.65 7.19.62-5.46 4.22 1.64 7.03L12 17.27z" />
                </svg>
            );
        }

        return stars;
    };

    const handleThumbnailClick = (image) => {
        setCurrentImage(image);
    };

    const [zoomedImage, setZoomedImage] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setCursorPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setZoomedImage(true);
    };

    const handleMouseLeave = () => {
        setZoomedImage(false);
    };

    const handleVariantChange = (variantId) => {
        const selected = data.varient.find((variant) => variant._id === variantId);
        setSelectedVariant(selected);

    };
    const handleLikeClick = async () => {
        setLiked((prevLiked) => !prevLiked);
        await like({ uId: user._id, pId: id });
    };

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-light-golden">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap lg:flex-nowrap">
                    <motion.div
                        className="lg:w-1/2 w-full lg:pr-10 lg:py-6 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            alt="ecommerce"
                            className="lg:w-full w-full object-cover object-center rounded-lg shadow-lg border border-gray-200"
                            src={currentImage}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        {/* Thumbnail Gallery */}
                        <div className="flex flex-wrap mt-4 sm:hidden">
                            {data?.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-24 h-24 object-cover rounded-lg cursor-pointer m-2"
                                    onClick={() => handleThumbnailClick(image)}
                                />
                            ))}
                        </div>
                        {zoomedImage && (
                            <div
                                className="absolute border border-gray-300 rounded-lg"
                                style={{
                                    width: '200px',
                                    height: '200px',
                                    top: `${cursorPosition.y}px`,
                                    left: `${cursorPosition.x}px`,
                                    backgroundImage: `url(${currentImage})`,
                                    backgroundSize: '600px 600px',
                                    backgroundPosition: `-${cursorPosition.x * 2}px -${cursorPosition.y * 2}px`,
                                    pointerEvents: 'none',
                                    transform: 'translate(-50%, -50%)',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                                }}
                            />
                        )}
                    </motion.div>
                    <motion.div
                        className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{data?.brand || 'IAMFAIZ55'}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{data?.name || 'Product Name'}</h1>
                        <p className="leading-relaxed mb-6">{data?.desc || 'Product description here'}</p>


                        {/* Variant Selection Dropdown */}
                        <select onChange={(e) => handleVariantChange(e.target.value)} className="select select-dark border-1 border-black ml-1 bg-light-golden">
                            {data && data.varient.map(item => (
                                <option key={item._id} value={item._id}>
                                    {item.height}
                                </option>
                            ))}
                        </select>
                        <div className=" p-4 rounded-md">
                            <h3 className="font-semibold text-lg">Product Details:</h3>
                            <ul className="list-disc list-inside">
                                <li>Material: {data?.material || 'N/A'}</li>
                                <li>Purity: {data?.purity || 'N/A'}</li>
                                <li>Weight: {selectedVariant?.prductWeight || 'N/A'}</li>
                                <li>Discount: ${selectedVariant?.discount || 'N/A'}</li>
                                <li>Available Quantity: {selectedVariant?.quantity || 'N/A'}</li>
                            </ul>
                            <h1 className='font-bold mt-5 text-md'>Varient Description: </h1>
                            <p className="leading-relaxed mb-6 ">{selectedVariant && selectedVariant.desc || 'Product description here'}</p>
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="flex">{renderStars(data && data.rating)}</div>
                            <span className="ml-3 text-gray-600 text-sm">({calculateRating()}/5)</span>
                        </div>

                        <div className="block md:flex items-center mb-6">
                            <h4 className="text-lg font-medium text-center">Price: ${discountedPrice(selectedVariant?.price) || 'Price'}</h4>
                            <div className="flex flex-col sm:flex-row">
                                <button
                                    onClick={() => {
                                        navigate(`/user/checkout/${data?._id}`);
                                        setselectedProd({ ...data, varient: selectedVariant });
                                    }}
                                    className=" btn flex m-4 text-white justify-center bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mb-2 sm:mb-0"
                                >
                                    Buy
                                </button>
                                <button
                                    onClick={() => addToCart({ pId: data._id, uId: user?._id, varientId: selectedVariant._id })}
                                    className="btn flex m-4 justify-center text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded mb-2 sm:mb-0"
                                >
                                    Add to Cart
                                </button>

                                {/* Like Button */}
                                <div className="text-center">
                                    <button onClick={handleLikeClick} className="m-5">
                                        {liked ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#f44336" viewBox="0 0 24 24" className="w-8 h-8">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#f44336" strokeWidth="2" />
                                            </svg>
                                        )}
                                        {/* <span className="ml-2">{liked ? "Liked" : "Like"}</span> */}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="hidden md:flex flex-wrap mt-4">
                    {data?.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg cursor-pointer m-2"
                            onClick={() => handleThumbnailClick(image)}
                        />
                    ))}
                </div>

                <Review />
            </div>
        </section>
    );
};

// The Review component remains unchanged

// export default Details;




const Review = () => {
    const { id } = useParams();
    const [postReview, { isSuccess, isLoading, isError, error }] = usePostReviewMutation()
    const { data: reviews } = useGetReviewsQuery(id)
    // console.log(reviews);

    const { user } = useSelector((state) => state.userData);


    const [newReview, setNewReview] = useState({
        review: '',
        rating: 0
    });

    const handleReview = (e) => {
        setNewReview({
            ...newReview,
            review: e.target.value
        });
    };

    const handleRating = (e) => {
        setNewReview({
            ...newReview,
            rating: e.target.value
        });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Review Post Success ")
            setNewReview({ review: '', rating: 0 });

        }
    }, [isSuccess])

    return (
        <section className="text-yellow-900 body-font overflow-hidden bg-light-golden">
            <div className="container mx-auto p-6">
                {/* Add Review Form */}
                {/* <pre>{JSON.stringify(newReview, null, 2)}</pre> */}
                <div className="w-full mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-500">Add a Review</h2>
                    <div>
                        <textarea
                            value={newReview.review}
                            onChange={handleReview}
                            name="review"
                            className="w-full h-24 p-4 border border-yellow-300 rounded-lg resize-none mb-4 bg-yellow-50 text-yellow-900"
                            placeholder="Write your review..."
                            required
                        ></textarea>

                        <div className="rating mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <label key={star}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={star}
                                        checked={newReview.rating === star}
                                        onChange={handleRating}
                                        className="hidden"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill={star <= newReview.rating ? "#fbbf24" : "#e5e7eb"}
                                        className="w-7 h-7 cursor-pointer"
                                    >
                                        <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2l3.17 6.65 7.19.62-5.46 4.22 1.64 7.03L12 17.27z" />
                                    </svg>
                                </label>
                            ))}
                        </div>

                        <button
                            type="submit"
                            onClick={e => postReview({ ...newReview, uId: user._id, pId: id })}
                            className="text-white bg-golden btn ml-5 btn-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4 text-yellow-500">Reviews</h2>

                    {reviews && reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div
                                key={review._id}
                                className="p-4 mb-4 bg-yellow-100 rounded-lg shadow-lg border border-yellow-200"
                            >
                                <h3 className="text-lg font-medium text-yellow-800">
                                    {review.uId && review.uId.mobile}
                                </h3>
                                <p className="mt-2 text-yellow-900">{review.review}</p>
                                <div className="flex items-center mt-2">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="#fbbf24"
                                            className="w-5 h-5"
                                        >
                                            <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2l3.17 6.65 7.19.62-5.46 4.22 1.64 7.03L12 17.27z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-yellow-900 text-3xl font-bold">No reviews yet.</p>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Details;