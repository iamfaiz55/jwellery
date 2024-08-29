import React, { useEffect, useState } from 'react';
import { useCart } from '../App';
import { useCreateOrderMutation, useDeleteFullCartMutation, useRazorpayMutation, useVerifyPaymentMutation } from '../redux/apis/userApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [raz, { isSuccess: razSuccess, data }] = useRazorpayMutation();
    // console.log(data);
    const [initiate, { isSuccess: initiateSuccess }] = useVerifyPaymentMutation()

    const { user } = useSelector(state => state.userData);
    const [createOrder, { isSuccess }] = useCreateOrderMutation();
    const { cartData, setCartData } = useCart();
    const [deleteFull, { isSuccess: deleteSuccess }] = useDeleteFullCartMutation();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardHolder: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        securityCode: '',
    });

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleCardDetailsChange = (event) => {
        const { name, value } = event.target;
        setCardDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };




    let x = `${user._id}${user.name}`
    const handleSubmit = (event) => {
        event.preventDefault();

        const orderData = {
            deliveryAddressId: cartData.deliveryAddressId,
            paymentMethod,
            subtotal: cartData.subtotal,
            orderItems: cartData.cartItems.map(item => ({
                _id: item.productId._id,
                quantity: item.quantity
            })),
            ...(paymentMethod === 'card' && { cardDetails })
        };

        if (paymentMethod === 'razorpay') {
            raz({
                ...orderData, userId: user._id, currency: "INR",
                receipt: x
            });

        } else {
            createOrder({ ...orderData, userId: user._id });
        }
    };
    // deliveryAddressId, paymentMethod, orderItems,userID
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
                    subtotal: cartData.subtotal
                }),
            })
            razor.on('payment.failed', (res) => {
                console.log('Payment Failed: ' + res.error.description)
            });

            razor.open()
        }
    }, [razSuccess, data])
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
        if (razSuccess) {
            toast.success("Payment nikal gai");
            // deleteFull({ userId: user._id });
            // setCartData({});
            // localStorage.removeItem("cartData");
        }
    }, [razSuccess]);

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
                            {paymentMethod === 'card' && (
                                <>
                                    <div className="my-2">
                                        <input
                                            type="text"
                                            name="cardHolder"
                                            value={cardDetails.cardHolder}
                                            onChange={handleCardDetailsChange}
                                            className="block w-full px-4 py-2 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700"
                                            placeholder="Card holder"
                                            maxLength="22"
                                        />
                                    </div>
                                    <div className="my-2">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardDetails.cardNumber}
                                            onChange={handleCardDetailsChange}
                                            className="block w-full px-4 py-2 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700"
                                            placeholder="Card number"
                                        />
                                    </div>
                                    <div className="my-2">
                                        <label className="text-gray-700 text-sm block mb-1">Expired</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                name="expiryMonth"
                                                value={cardDetails.expiryMonth}
                                                onChange={handleCardDetailsChange}
                                                className="form-select block w-full px-4 py-2 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700"
                                            >
                                                <option value="" disabled>
                                                    MM
                                                </option>
                                                {[...Array(12).keys()].map((i) => (
                                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                                        {String(i + 1).padStart(2, '0')}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                name="expiryYear"
                                                value={cardDetails.expiryYear}
                                                onChange={handleCardDetailsChange}
                                                className="form-select block w-full px-4 py-2 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700"
                                            >
                                                <option value="" disabled>
                                                    YY
                                                </option>
                                                {[...Array(6).keys()].map((i) => (
                                                    <option key={2021 + i} value={2021 + i}>
                                                        {2021 + i}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                name="securityCode"
                                                value={cardDetails.securityCode}
                                                onChange={handleCardDetailsChange}
                                                className="block w-full px-4 py-2 border rounded-lg bg-white shadow-sm placeholder-gray-400 text-gray-700"
                                                placeholder="Security code"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="my-4 flex items-center">
                                <input
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={handlePaymentMethodChange}
                                    className="form-radio size-6"
                                />
                                <label htmlFor="card" className="ml-2 text-gray-700 text-2xl">
                                    Card Payment
                                </label>
                            </div>
                            <div className="my-4 flex items-center">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={handlePaymentMethodChange}
                                    className="form-radio size-6"
                                />
                                <label htmlFor="cod" className="ml-2 text-gray-700 text-2xl">
                                    Cash on Delivery (COD)
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
                                />
                                <label htmlFor="razorpay" className="ml-2 text-gray-700 text-2xl">
                                    Razorpay
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn w-full bg-gray-400 text-white"
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
