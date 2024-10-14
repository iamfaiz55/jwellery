import React, { useEffect } from 'react';
import { useDeleteLikeMutation, useGetLikedQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../user/BottomNav';
import useScrollRestoration from '../hooks/useScrollRestoration';
import { usePostHistoryMutation } from '../redux/apis/openApi';

const Liked = () => {
    useScrollRestoration()
    const { user } = useSelector((state) => state.userData);
    const { data } = useGetLikedQuery(user._id);
    // console.log(data);
    const [postHistory] = usePostHistoryMutation()

    const [deleteLiked, { isSuccess }] = useDeleteLikeMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success('Liked Item Deleted Successfully');
        }
    }, [isSuccess]);


    useEffect(() => {
        if (user) {
            postHistory({ userId: user._id, type: "liked" })
        }
    }, [])


    return (
        <div className=" bg-light-golden dark:bg-gray-900">
            {user.isBlock ? (
                <div className="text-center py-10">
                    <h1 className="text-3xl font-bold text-dark-golden dark:text-light-golden">
                        You Are Blocked By Admin
                    </h1>
                </div>
            ) : (
                <>
                    <h1 className="mb-5 text-center text-3xl font-extrabold text-dark-golden dark:text-light-golden">
                        Your Liked Products
                    </h1>

                    {data && data.length > 0 ? (
                        <div className="mx-auto max-w-6xl px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="w-full space-y-6">
                                {data.map((likedItem) => {
                                    // Find the matched variant based on varientId
                                    const matchedVariant = likedItem.productId.varient.find(
                                        (variant) => variant._id === likedItem.varientId
                                    );

                                    return (
                                        <div
                                            key={likedItem.productId._id}
                                            onClick={() => navigate(`/details/${likedItem.productId._id}`)}
                                            className="flex flex-col sm:flex-row items-center justify-between p-2  bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                                        >
                                            <div className="flex-shrink-0 w-full sm:w-40 mb-4 sm:mb-0">
                                                <img
                                                    src={likedItem.productId.images[0]}
                                                    alt="product-image"
                                                    className="w-full rounded-lg"
                                                />
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:justify-between w-full sm:ml-4">
                                                <div className="sm:mt-0 space-y-2">
                                                    <h2 className="text-xl font-semibold text-dark-golden dark:text-light-golden">
                                                        {likedItem.productId.name}
                                                    </h2>
                                                    {matchedVariant && (
                                                        <>
                                                            <p className="text-dark-golden dark:text-light-golden">
                                                                Price: ₹{matchedVariant.price}
                                                            </p>
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                {matchedVariant.desc}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between sm:space-x-6 mt-4 sm:mt-0">
                                                    {matchedVariant && (
                                                        <p className="text-lg font-semibold text-dark-golden dark:text-light-golden">
                                                            ₹{matchedVariant.price}
                                                        </p>
                                                    )}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteLiked(likedItem._id);
                                                        }}
                                                        className="ml-4 p-2 transition-colors duration-200 rounded-lg bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6 text-white hover:text-gray-200"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="text-3xl font-extrabold text-center text-dark-golden dark:text-light-golden">
                            Empty
                        </div>
                    )}
                </>
            )}
            <BottomNav />
        </div>
    );
};

export default Liked;
