import React, { useState, useEffect, useContext } from 'react';
import { useDeleteCArtItemMutation, useGetAllCartItemsQuery } from '../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';

const Cart = () => {
    const { user } = useSelector(state => state.userData);

    const { data } = useGetAllCartItemsQuery(user._id);
    // console.log(data.length);

    const [cartItems, setCartItems] = useState([]);
    console.log(cartItems.length);

    const [subtotal, setSubtotal] = useState(0);
    const [deleteItem, { isSuccess }] = useDeleteCArtItemMutation()
    const { cartData, setCartData } = useContext(CartContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (data) {
            setCartItems(data);
            calculateSubtotal(data);
        }
    }, [data]);

    const calculateSubtotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
        setSubtotal(total);
    };

    const handleQuantityChange = (id, delta) => {
        const updatedItems = cartItems.map(item => {
            if (item.productId._id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity > 0) {
                    return { ...item, quantity: newQuantity };
                }
            }
            return item;
        });
        setCartItems(updatedItems);
        calculateSubtotal(updatedItems);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Cart Item Delete Success")
        }
    }, [isSuccess])


    return (
        <div className="min-h-screen  pt-20 bg-light-golden">
            <h1 className="mb-10 text-center text-3xl font-extrabold ">Your Shopping Cart</h1>
            {
                cartItems.length > 0 ? <>
                    <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="md:w-2/3">
                            {cartItems.map(item => (
                                <div key={item.productId._id} className="mb-6 rounded-lg bg-white p-6 shadow-xl transform transition-all hover:scale-105">
                                    <div className="sm:flex sm:justify-between">
                                        <img src={item.productId.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                            <div className="mt-5 sm:mt-0">
                                                <h2 className="text-xl font-semibold text-gray-800">{item.productId.name}</h2>
                                                <p>Price :{item.productId.price}</p>
                                                <p className="mt-1  text-gray-600">{item.productId.desc}</p>
                                            </div>
                                            <div className="mt-4 flex justify-between sm:mt-0 sm:space-x-6">
                                                <div className="flex items-center">
                                                    <button
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-800 transition-colors duration-200 hover:bg-pink-500 hover:text-white"
                                                        onClick={() => handleQuantityChange(item.productId._id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-2 text-lg font-medium text-gray-800">{item.quantity}</span>
                                                    <button
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-800 transition-colors duration-200 hover:bg-pink-500 hover:text-white"
                                                        onClick={() => handleQuantityChange(item.productId._id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <p className="text-lg font-semibold text-gray-800">₹{(item.productId.price * item.quantity).toFixed(2)}</p>
                                                    <button onClick={e => deleteItem(item._id)}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="h-6 w-6 cursor-pointer text-gray-800 transition-colors duration-200 hover:text-red-500"
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
                        {/* Subtotal Section */}
                        <div className="mt-6 rounded-lg bg-white p-6 shadow-xl md:mt-0 md:w-1/3">
                            <div className="mb-4 text-center">
                                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
                            </div>
                            <div className="flex justify-between border-b pb-4">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">₹{subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between border-b py-4">
                                <p className="text-gray-700">Shipping</p>
                                <p className="text-gray-700">FREE</p>
                            </div>
                            <div className="flex justify-between border-b py-4">
                                <p className="text-lg font-semibold text-gray-800">Total</p>
                                <p className="text-lg font-semibold text-gray-800">₹{subtotal.toFixed(2)}</p>
                            </div>
                            <button onClick={e => {
                                setCartData({ cartItems, subtotal });
                                navigate('/user/cartCheckout');
                            }} className="mt-6 w-full rounded-md bg-yellow-500 py-2 text-lg font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-pink-600">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
                    : <>
                        <div className='text-3xl font-extrabold text-center'>Empty</div>
                    </>
            }
        </div>
    );
};

export default Cart;
