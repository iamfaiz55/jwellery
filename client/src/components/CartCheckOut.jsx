import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddAddressMutation, useGetAddressesQuery } from '../redux/apis/userApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom';
import { useGetTaxesQuery } from '../redux/apis/openApi';

const CartCheckOut = () => {
    const { cartData, setCartData } = useCart();
    const { user } = useSelector(state => state.userData);
    const { data: addresses } = useGetAddressesQuery(user._id);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const navigate = useNavigate();
    const { data: taxes } = useGetTaxesQuery();

    // Extracting tax details
    const salesTax = taxes?.find(tax => tax.taxName === 'Sales Tax')?.percent || 0;
    const discount = taxes?.find(tax => tax.taxName === 'Discount')?.percent || 0;
    const makingCharges = taxes?.find(tax => tax.taxName === 'Making Charges')?.percent || 0;

    // Calculations for order summary
    const subtotal = cartData.cartItems.reduce((acc, item) => acc + item.quantity * Number(item.productId.price), 0);
    const discountAmount = subtotal * (discount / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;
    const salesTaxAmount = subtotalAfterDiscount * (salesTax / 100);
    const total = subtotalAfterDiscount + salesTaxAmount + makingCharges;

    const handleAddressChange = (addressId) => {
        setSelectedAddress(addressId);
    };

    const handlePayNow = () => {
        if (selectedAddress) {
            setCartData(prevData => ({
                ...prevData,
                deliveryAddressId: selectedAddress
            }));
            navigate("/user/payment");
        } else {
            toast.error("Please select an address before proceeding.");
        }
    };

    return (
        <>
            <div className="grid grid-cols-3">
                <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                    {/* Checkout Message */}
                    <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-yellow-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 sm:w-5 h-6 sm:h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="text-sm font-medium ml-3">Checkout</div>
                        </div>
                        <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
                            Complete your shipping and payment details below.
                        </div>
                        <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <button className="btn bg-gray-400" onClick={() => document.getElementById('add').showModal()}>Add Address</button>
                    <dialog id="add" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Add Address</h3>
                            <Form />
                        </div>
                    </dialog>
                    {/* Address List with Checkbox */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md">
                        {addresses &&
                            addresses.map((item) => (
                                <div key={item._id} className="overflow-hidden group relative rounded-lg p-1 flex justify-center items-center">
                                    <div className="hidden group-hover:block animate-gradient absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 rounded-lg shadow-xl"></div>
                                    <label className="relative z-10 w-full bg-white p-6 sm:p-8 rounded-lg flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-gray-500"
                                            checked={selectedAddress === item._id}
                                            onChange={() => handleAddressChange(item._id)}
                                        />
                                        <div className="ml-4">
                                            <h3 className="text-xl font-bold text-gray-900">{item.addressType}</h3>
                                            <p className="mt-2 text-sm text-gray-500">House {item.houseNo}</p>
                                            <p className="mt-2 text-sm text-gray-500">Country {item.country}</p>
                                            <p className="mt-2 text-sm text-gray-500">State {item.state}</p>
                                            <p className="mt-2 text-sm text-gray-500">Pincode {item.pincode}</p>
                                            <p className="mt-2 text-sm text-gray-500">Mobile {item.mobile}</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                    </div>

                    <button onClick={handlePayNow} className="submit-button px-4 py-3 rounded-full bg-gray-400 text-white  w-full text-xl font-semibold transition-colors">
                        Pay Now
                    </button>
                </div>

                <div className="col-span-1 bg-white lg:block hidden">
                    <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                    {cartData && cartData.cartItems.map(item => (
                        <ul className="py-6 border-b space-y-6 px-8" key={item.productId._id}>
                            <li className="grid grid-cols-6 gap-2 border-b-1">
                                <div className="col-span-1 self-center">
                                    <img
                                        src={item.productId.image}
                                        alt={item.name}
                                        className="rounded w-full"
                                    />
                                </div>
                                <div className="flex flex-col col-span-3 pt-2">
                                    <span className="text-gray-600 text-md font-semi-bold">{item.name}</span>
                                    <span className="text-gray-400 text-sm inline-block pt-2">{item.productType}</span>
                                </div>
                                <div className=" ml-10 pt-3">
                                    <div className="flex items-center  text-sm justify-between">
                                        <h1 className="text-gray-400">{item.quantity} x {Number(item.productId.price).toFixed(2)}</h1>
                                        <span className="font-semibold text-gray-600">{(item.quantity * Number(item.productId.price)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    ))}

                    <div className="px-8 border-b">
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-500">{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Discount</span>
                            <span className="font-semibold text-gray-500">-{discountAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Making Charges</span>
                            <span className="font-semibold text-gray-500">{makingCharges.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Sales Tax</span>
                            <span className="font-semibold text-gray-500">{salesTaxAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                        <span>Total</span>
                        <span>{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);
    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: edit || {
            pincode: "",
            houseNo: "",
            city: "",
            state: "",
            country: "",
            addressType: "",
            mobile: "",
        },
        validationSchema: yup.object({
            pincode: yup.string().required("Pincode is required"),
            houseNo: yup.string().required("House No is required"),
            city: yup.string().required("City is required"),
            state: yup.string().required("State is required"),
            country: yup.string().required("Country is required"),
            addressType: yup.string().required("Address Type is required"),
            mobile: yup.string().required("Mobile is required"),
        }),
        onSubmit: (values, { resetForm }) => {
            addAddress({ ...values, userId: user._id });
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address Added Successfully");
            document.getElementById("add").close();
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
                    <div className="flex space-x-2 animate-pulse">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    </div>
                </div>
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <input {...formik.getFieldProps("houseNo")} type="text" placeholder="House No." className="input w-full my-2" />
                    <input {...formik.getFieldProps("state")} type="text" placeholder="State" className="input w-full my-2" />
                    <input {...formik.getFieldProps("city")} type="text" placeholder="City" className="input w-full my-2" />
                    <input {...formik.getFieldProps("pincode")} type="number" placeholder="Pincode" className="input w-full my-2" />
                    <input {...formik.getFieldProps("country")} type="text" placeholder="Country" className="input w-full my-2" />
                    <input {...formik.getFieldProps("mobile")} type="number" placeholder="Mobile" className="input w-full my-2" />
                    <select {...formik.getFieldProps("addressType")} className="select select-bordered w-full my-2">
                        <option value="" disabled>Select Address Type</option>
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                    </select>
                    <div className="modal-action">
                        <button type="submit" className="btn bg-gray-400 text-black">
                            {edit ? "Update" : "Add"} Address
                        </button>
                        <button type="button" onClick={() => document.getElementById(edit ? "update" : "add").close()} className="btn">
                            Close
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default CartCheckOut;
