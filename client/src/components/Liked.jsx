import React, { useEffect } from 'react';
import { useDeleteLikeMutation, useGetLikedQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Liked = () => {
    const { user } = useSelector(state => state.userData);
    const { data } = useGetLikedQuery(user._id);

    const [deleteLiked, { isSuccess }] = useDeleteLikeMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            toast.success("Liked Item Deleted Successfully");
        }
    }, [isSuccess]);

    return (
        <div className="min-h-screen pt-20 bg-light-golden dark:bg-dark-golden">

            {user.isBlock ? (
                <div className='text-center'>
                    <h1 className='text-3xl font-bold text-dark-golden dark:text-light-golden'>You Are Blocked By Admin</h1>
                </div>
            ) : (
                <>
                    <h1 className="mb-10 text-center text-3xl font-extrabold text-dark-golden dark:text-light-golden">Your Liked Products</h1>
                    {data && data.length > 0 ? (
                        <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
                            <div className="w-full">
                                {data.map(item => (
                                    <div
                                        key={item.productId._id}
                                        onClick={() => navigate(`/details/${item.productId._id}`)}
                                        className="mb-6 rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transform transition-all hover:scale-105"
                                    >
                                        <div className="sm:flex sm:justify-between">
                                            <img src={item.productId.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                <div className="mt-5 sm:mt-0">
                                                    <h2 className="text-xl font-semibold text-dark-golden dark:text-light-golden">{item.productId.name}</h2>
                                                    <p className="text-dark-golden dark:text-light-golden">Price: ₹{item.productId.price}</p>
                                                    <p className="mt-1 text-gray-600 dark:text-gray-400">{item.productId.desc}</p>
                                                </div>
                                                <div className="mt-4 flex justify-between sm:mt-0 sm:space-x-6">
                                                    <div className="flex items-center space-x-4">
                                                        <p className="text-lg font-semibold text-dark-golden dark:text-light-golden">₹{item.productId.price}</p>
                                                        <button
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                deleteLiked(item._id);
                                                            }}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="h-6 w-6 cursor-pointer text-dark-golden dark:text-light-golden transition-colors duration-200 hover:text-red-500 dark:hover:text-red-500"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='text-3xl font-extrabold text-center text-dark-golden dark:text-light-golden'>Empty</div>
                    )}
                </>
            )}
        </div>
    );
};

export default Liked;
