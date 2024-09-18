import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddCartMutation, useGetReviewsQuery, useLikeMutation, usePostReviewMutation } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useGetDetailsQuery, useGetTaxesQuery } from '../redux/apis/openApi';

const Details = () => {
    const { id } = useParams();
    const { data: reviews } = useGetReviewsQuery(id); // Fetch reviews data
    const { data, isError: isDetailError, error: detailsError } = useGetDetailsQuery(id);
    const { data: taxes } = useGetTaxesQuery();

    const navigate = useNavigate();
    const [addToCart, { isSuccess, isError: isAddError, error: addError }] = useAddCartMutation();
    const { user } = useSelector((state) => state.userData);
    const [like, { isSuccess: likeSuccesss, isError, error }] = useLikeMutation();

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
        // console.log((totalRating / reviews.length).toFixed(1));


        return (totalRating / reviews.length).toFixed(1)
    };
    // console.log(calculateRating());


    const renderStars = (rating) => {
        const maxRating = 5;
        let stars = [];

        for (let i = 1; i <= maxRating; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        className={`w-5 h-5 text-yellow-400`}
                    >
                        <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2l3.17 6.65 7.19.62-5.46 4.22 1.64 7.03L12 17.27z" />
                    </svg>
                );
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="currentColor"
                        className="w-5 h-5 text-yellow-400"
                    >
                        <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2v15.27z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-300"
                    >
                        <path d="M12 17.27l-6.18 3.25 1.64-7.03L1.64 9.27l7.19-.62L12 2l3.17 6.65 7.19.62-5.46 4.22 1.64 7.03L12 17.27z" />
                    </svg>
                );
            }
        }

        return stars;
    };


    const discountTax = taxes?.find((tax) => tax.taxName === 'Discount' && tax.active);

    return (
        <section className="text-gray-700 body-font overflow-hidden bg-light-golden">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap lg:flex-nowrap">
                    <motion.div
                        className="lg:w-1/2 w-full lg:pr-10 lg:py-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            alt="ecommerce"
                            className="lg:w-full w-full object-cover object-center rounded-lg shadow-lg border border-gray-200"
                            src={data?.image || 'default-image-url'}
                        />
                    </motion.div>
                    <motion.div
                        className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{data?.brand || 'IAMFAIZ55'}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{data?.name || 'Product Name'}</h1>
                        <div className="flex mb-4">
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                            </span>
                        </div>
                        <p className="leading-relaxed mb-6">{data?.desc || 'Product description here'}</p>
                        <div className=" mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                            <div className=" items-center mb-4">
                                <p className="mr-3 text-lg font-medium">{data?.productType || 'Type'}</p>
                                <p className="mr-3 text-lg font-medium">Material: {data?.material || 'Material'}</p>
                                <span className="mr-3 text-lg font-medium">Purity: {data?.purity || 'Purity'}</span>
                            </div>
                            <div className="  items-center">
                                <h4 className="mr-3 text-lg font-medium">Height : {data?.height || 'Height'}</h4>
                                <h4 className="mr-3 text-lg font-medium ">Width  :  {data?.width || 'Width'}</h4>
                                <h4 className="mr-3 text-lg font-medium">Weight :  {data?.prductWeight || 'Weight'}</h4>
                            </div>
                        </div>
                        <div className="flex items-center mb-6">
                            <div className="flex">{renderStars(calculateRating())}</div>
                            <span className="ml-3 text-gray-600 text-sm">({calculateRating()}/5)</span>
                        </div>

                        <div className=" items-center mb-6">
                            <h4 className="text-lg font-medium mr-4">MRP: ${data?.mrp || 'MRP'}</h4>
                            <h4 className="text-lg font-medium mr-4">Discount: ${data?.discount || 'MRP'}</h4>
                            {discountTax && (
                                <span className="text-lg font-medium">Additional Discount: {discountTax.percent}%</span>
                            )}
                            <h4 className="title-font font-medium text-2xl text-gray-900 mr-4">${discountedPrice(data?.price)}</h4>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <button
                                onClick={() => navigate(`/user/checkout/${data?._id}`)}
                                className="flex ml-4 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                            >
                                Buy
                            </button>
                            <button
                                onClick={() => addToCart({ pId: data._id, uId: user?._id })}
                                className="flex ml-4 text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-60  0 rounded"
                            >
                                Add to Cart
                            </button>
                            <button onClick={() => like({ pId: data?._id, uId: user?._id })} className="flex ml-4 rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Review />
        </section>
    );
};



const Review = () => {
    const { id } = useParams();
    const [postReview, { isSuccess, isLoading, isError, error }] = usePostReviewMutation()
    const { data: reviews } = useGetReviewsQuery(id)
    console.log(reviews);

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
