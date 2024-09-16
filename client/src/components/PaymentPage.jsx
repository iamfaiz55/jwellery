import React, { useEffect, useState } from 'react';
import { useCart } from '../App';
import { useCreateOrderMutation, useDeleteFullCartMutation, useGetAllPaymentMethodUserQuery, useRazorpayMutation, useVerifyPaymentMutation } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetTaxesQuery } from '../redux/apis/openApi';

const PaymentPage = () => {
    const [raz, { isSuccess: razSuccess, data }] = useRazorpayMutation();
    const { data: paymentMethods } = useGetAllPaymentMethodUserQuery();
    const [initiate, { isSuccess: initiateSuccess }] = useVerifyPaymentMutation();



    const { user } = useSelector(state => state.userData);
    const [createOrder, { isSuccess }] = useCreateOrderMutation();
    const { cartData, setCartData } = useCart();
    const [deleteFull, { isSuccess: deleteSuccess }] = useDeleteFullCartMutation();
    const [paymentMethod, setPaymentMethod] = useState('');

    // console.log("cart Data", cartData);

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };


    let x = `${user._id}${user.name}`;
    const handleSubmit = (e) => {
        e.preventDefault();

        const orderData = {
            deliveryAddressId: cartData.deliveryAddressId,
            paymentMethod,
            subtotal: cartData.subtotal,
            orderItems: cartData.cartItems.map(item => ({
                _id: item.productId._id,
                quantity: item.quantity
            })),

        };
        // console.log(cartData);

        const totalAmount = cartData.subtotal
        const roundedTotalAmount = Math.round(totalAmount * 100) / 100;
        // console.log(totalAmount);

        if (paymentMethod === 'razorpay') {
            raz({
                ...orderData, userId: user._id, currency: "INR",
                receipt: x,
                subtotal: roundedTotalAmount
            });

        } else {
            createOrder({ ...orderData, userId: user._id });
        }
    };


    useEffect(() => {
        if (razSuccess) {
            const razor = new window.Razorpay({
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: data.amount * 100,
                name: user.name,
                currency: "INR",
                order_id: data.id,
                prefill: {
                    name: user && user.name,
                    email: user && user.email,
                    contact: user && user.contact && user.contact
                },
                theme: {
                    color: "#f9f2e8"
                },
                handler: res => initiate({
                    ...res, amount: data.amount,
                    deliveryAddressId: cartData.deliveryAddressId,
                    paymentMethod: paymentMethod,
                    userId: user._id,
                    orderItems: cartData.cartItems.map(item => ({
                        _id: item.productId._id,
                        quantity: item.quantity
                    })),
                }),
            });
            razor.on('payment.failed', (res) => {
                console.log('Payment Failed: ' + res.error.description);
            });

            razor.open();
        }
    }, [razSuccess, data]);

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            toast.success("Order placed successfully! Thank you.");
            deleteFull({ userId: user._id });
            setCartData({});
            localStorage.removeItem("cartData");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (initiateSuccess) {
            toast.success("Order placed successfully! Thank you.");
            deleteFull({ userId: user._id });
            setCartData({});
            localStorage.removeItem("cartData");
        }
    }, [initiateSuccess]);

    useEffect(() => {
        if (deleteSuccess) {
            navigate("/");
        }
    }, [deleteSuccess]);

    return (
        <div className=''>
            <div className="flex justify-center items-center  bg-light-golden p-4">
                <div className="credit-card w-full max-w-sm mb-32 shadow-md rounded-xl mt-5 bg-white">
                    <header className="flex flex-col items-center p-4">
                        <ul className="flex mt-2">
                            <li className="mx-1">
                                <img
                                    className="w-12"
                                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                                    alt="computop"
                                />
                            </li>
                            <li className="mx-1">
                                <img
                                    className="w-10"
                                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                                    alt="verified by visa"
                                />
                            </li>
                            <li className="mx-1">
                                <img
                                    className="w-6"
                                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                                    alt="mastercard id check"
                                />
                            </li>
                        </ul>
                    </header>
                    <main className="p-4">
                        <h1 className="text-lg font-semibold text-gray-700 text-center mb-4">
                            Payment Options
                        </h1>
                        <form onSubmit={handleSubmit}>

                            <div className="my-4 flex items-center">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={handlePaymentMethodChange}
                                    className="form-radio size-6"
                                    disabled={!paymentMethods?.find(pm => pm.method === 'cod' && pm.active)}
                                />
                                <label htmlFor="cod" className="ml-2 text-gray-700 text-2xl">
                                    Cash On Delivery
                                </label>
                            </div>
                            <div className="my-4 flex items-center">
                                <input
                                    type="radio"
                                    id="razorpay"
                                    name="paymentMethod"
                                    value="razorpay"
                                    checked={paymentMethod === 'razorpay'}
                                    onChange={handlePaymentMethodChange}
                                    className="form-radio size-6"
                                    disabled={!paymentMethods?.find(pm => pm.method === 'razorpay' && pm.active)}
                                />
                                <label htmlFor="razorpay" className="ml-2 text-gray-700 text-2xl">
                                    Razorpay
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-light-golden text-golden font-semibold rounded-lg shadow-md"
                            >
                                Pay Now
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;