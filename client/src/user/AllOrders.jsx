import React, { useEffect } from 'react';
import { useCancelOrderMutation, useGetOrdersQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const AllOrders = () => {
    const { user } = useSelector(state => state.userData);
    const { data, error, isError } = useGetOrdersQuery(user._id);
    const [cancelOrder, { isSuccess }] = useCancelOrderMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.success("Order Cancel Success")
        }
    }, [isSuccess])

    return (
        <div className="py-14 px-8 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto space-y-8 bg-light-golden">
            {
                isError
                    ? <div className='text-center font-bold text-3xl'>{JSON.stringify(error.data.message)}</div>
                    : <>
                        {
                            data && data.map(order => {
                                if (order.status != "cancelled") {
                                    return <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0"
                                    >
                                        <div className={`flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8`}>
                                            <div className="flex flex-col justify-start items-start border border-1 border-amber-500 dark:bg-gray-800  bg-light-golden px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
                                                <div className="flex justify-between w-full">
                                                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 ">
                                                        {/* Order # */}
                                                    </p>
                                                    <button
                                                        onClick={e => cancelOrder(order._id)}
                                                        className="btn bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                                    >
                                                        Cancel Order
                                                    </button>
                                                </div>
                                                {order.orderItems.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className={` mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full`}
                                                    >
                                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                                            <img
                                                                className="w-full"
                                                                src={item.productId.image}
                                                                alt={item.productId.name}
                                                            />
                                                        </div>
                                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                                    {item.productId.name}
                                                                </h3>
                                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Material: </span> {item.productId.material}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Weight: </span> {item.productId.prductWeight}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Price: </span> ${item.productId.price}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">status: </span> {order.status}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Order Id: </span>{order._id}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                                    Quantity: {item.quantity}
                                                                </p>
                                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                                    Total: ${(item.productId.price * item.quantity).toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                }
                            }
                            )
                        }
                        <h1 className="text-2xl font-semibold mb-4">Cancelled Orders</h1>


                        {
                            data && data.map(order => {
                                if (order.status == "cancelled") {
                                    return <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col xl:flex-row justify-center items-stretch w-full xl:space-x-8  space-y-4 md:space-y-6 xl:space-y-0"
                                    >
                                        <div className={`flex flex-col justify-start items-start w-full  space-y-4 md:space-y-6 xl:space-y-8`}>
                                            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-amber-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full rounded-lg shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-lg">
                                                <div className="flex justify-between w-full">
                                                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 ">
                                                        {/* Order # */}
                                                    </p>

                                                </div>
                                                {order.orderItems.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className={` mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full`}
                                                    >
                                                        <div className="pb-4 md:pb-8 w-full md:w-40">
                                                            <img
                                                                className="w-full"
                                                                src={item.productId.image}
                                                                alt={item.productId.name}
                                                            />
                                                        </div>
                                                        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                                                                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                                                                    {item.productId.name}
                                                                </h3>
                                                                <div className="flex justify-start items-start flex-col space-y-2">
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Material: </span> {item.productId.material}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Weight: </span> {item.productId.prductWeight}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Price: </span> ${item.productId.price}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">status: </span> {order.status}
                                                                    </p>
                                                                    <p className="text-sm dark:text-white leading-none text-gray-800">
                                                                        <span className="dark:text-gray-400 text-gray-300">Order Id: </span>{order._id}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-between space-x-8 items-start w-full">
                                                                <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                                                                    Quantity: {item.quantity}
                                                                </p>
                                                                <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                                                                    Total: ${(item.productId.price * item.quantity).toFixed(2)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                }
                            }
                            )
                        }
                    </>
            }
        </div>
    );
};

export default AllOrders;
