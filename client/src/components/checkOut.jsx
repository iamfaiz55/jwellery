import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddAddressMutation, useGetAddressesQuery, useGetDetailsQuery } from '../redux/apis/userApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../App';

const CheckOut = () => {
    const { cartData, setCartData } = useCart();
    const [selectedAddress, setSelectedAddress] = useState(null);


    const { user } = useSelector(state => state.userData);
    const { data, error: addressError } = useGetAddressesQuery(user._id);
    const { id } = useParams()
    const { data: product, error } = useGetDetailsQuery(id)
    // console.log(product);
    const navigate = useNavigate()
    const handlePayNow = () => {
        if (selectedAddress) {
            // Update the cart data with the selected address
            setCartData({
                ...cartData,
                deliveryAddressId: selectedAddress,
                subtotal: product.price * quantity,
                cartItems: [{ productId: product, quantity }]

            });
            navigate("/user/payment");
        } else {
            toast.error("Please select an address before proceeding.");
        }
    };


    const [quantity, setQuantity] = useState(1);

    const plus = () => {
        setQuantity(pre => pre + 1);
    };

    const minus = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddressChange = (addressId) => {
        setSelectedAddress(addressId);
    };
    useEffect(() => {
        if (error || addressError) {
            console.error("Failed to fetch data:", { error, addressError });
        }
    }, [error, addressError]);
    return (
        <>
            <div className="h-screen grid grid-cols-3">
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
                            <h3 className="font-bold text-lg">Hello!</h3>

                            <Form />

                        </div>
                    </dialog>
                    {/* Address List with Checkbox */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-md">
                        {data &&
                            data.map((item) => (
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




                    {
                        product && <>


                            <ul className="py-6 border-b space-y-6 px-8">

                                <li className="grid grid-cols-6 gap-2 border-b-1">
                                    <div className="col-span-1 self-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="rounded w-full"
                                        />
                                    </div>
                                    <div className="flex flex-col col-span-3 pt-2">
                                        <span className="text-gray-600 text-md font-semi-bold">{product.name}</span>
                                        <span className="text-gray-400 text-sm inline-block pt-2">{product.productType}</span>
                                    </div>
                                    <div className="col-span-2 pt-3">
                                        <div className="flex items-center space-x-2 text-sm justify-between">
                                            <span className="text-gray-400">1 x {product.price}</span>
                                            {/* <span className="text-gray-400 font-semibold inline-block">{product.price}</span> */}
                                            <div className="flex items-center ml-6">
                                                <button
                                                    onClick={minus}
                                                    className="bg-gray-200 text-gray-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded-l"
                                                >
                                                    -
                                                </button>
                                                <span className="text-gray-900 px-3">{quantity}</span>
                                                <button
                                                    onClick={plus}
                                                    className="bg-gray-200 text-gray-600 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded-r"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </>
                    }

                    <div className="px-8 border-b">
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-500">{product ? quantity * product.price : 0}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="font-semibold text-gray-500">Free</span>
                        </div>
                    </div>
                    <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                        <span>Total</span>
                        <span>{product ? quantity * product.price : 0}</span>
                    </div>
                </div>
            </div>
        </>
    );
};



const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);

    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation()
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
            pincode: yup.string().required(),
            houseNo: yup.string().required("Enter houseNo"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Enter country"),
            addressType: yup.string().required("Enter addressType"),
            mobile: yup.string().required("Enter mobile"),

        }),
        onSubmit: (values, { resetForm }) => {
            addAddress({ ...values, userId: user._id })
            console.log(values);

            resetForm();
        },
    });
    useEffect(() => {
        if (isSuccess) {
            toast.success("Address Add Success")
            document.getElementById("add").close()
            // btnRef.current.click()
        }
    }, [isSuccess])

    // let isLoading = false
    return <>
        {
            isLoading
                ? <>
                    <div class="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

                        <div class="flex space-x-2 animate-pulse">
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>

                    </div>
                </>
                : <>
                    <form onSubmit={formik.handleSubmit}>
                        {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                        <input {...formik.getFieldProps("houseNo")} type="text" placeholder="Type House No." className="input w-full my-2" />
                        <input {...formik.getFieldProps("state")} type="text" placeholder="Type State" className="input w-full my-2" />
                        <input {...formik.getFieldProps("city")} type="text" placeholder="Type City" className="input w-full my-2" />
                        <input {...formik.getFieldProps("pincode")} type="number" placeholder="Type pincode" className="input w-full my-2" />
                        <input {...formik.getFieldProps("country")} type="text" placeholder="Type Country" className="input w-full my-2" />
                        <input {...formik.getFieldProps("mobile")} type="number" placeholder="Type Mobile" className="input w-full my-2" />
                        {/* <input type="text" placeholder="Type here" className="input w-full my-2" /> */}
                        <select {...formik.getFieldProps("addressType")} className="select select-bordered w-full my-2">
                            <option selected >Select Address Type</option>
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
                </>
        }





    </>
}
export default CheckOut;
