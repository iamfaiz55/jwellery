import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddAddressMutation, useGetAddressesQuery } from '../redux/apis/userApi';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart, useProduct } from '../App';
import { useGetDetailsQuery, useGetTaxesQuery } from '../redux/apis/openApi';

const CheckOut = () => {
    const { selectedProd, setselectedProd } = useProduct()
    const { cartData, setCartData } = useCart();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { data: taxes } = useGetTaxesQuery();
    const { user } = useSelector(state => state.userData);
    const { data: addresses, error: addressError } = useGetAddressesQuery(user && user._id);
    const { id } = useParams();
    const { data: product, error, isError } = useGetDetailsQuery(id);
    const navigate = useNavigate();
    // console.log("product ", product);
    // console.log("selected prod ", selectedProd);

    const [quantity, setQuantity] = useState(1);
    const discount = taxes && taxes.find(tax => tax.taxName === 'Discount');
    const salesTax = taxes && taxes.find(tax => tax.taxName === 'Sales Tax');
    const makingCharges = taxes && taxes.find(tax => tax.taxName === 'Making Charges');

    // const originalPrice = product ? parseFloat(product.price) : 0;
    const originalPrice = selectedProd && selectedProd.varient.price ? parseFloat(selectedProd.varient.price) : 0;
    const discountPercent = discount ? discount.percent : 0;
    const salesTaxPercent = salesTax ? salesTax.percent : 0;
    const makingChargesPercent = makingCharges ? makingCharges.percent : 0;

    const discountedPrice = originalPrice * (1 - discountPercent / 100);
    const subtotal = quantity * discountedPrice;
    const makingChargesAmount = subtotal * (makingChargesPercent / 100);
    const salesTaxAmount = subtotal * (salesTaxPercent / 100);
    const total = subtotal + makingChargesAmount + salesTaxAmount;
    // console.log(product);
    // console.log(selectedProd);
    // console.log("qty", quantity);

    const handlePayNow = () => {
        if (selectedAddress) {
            setCartData({
                ...cartData,
                deliveryAddressId: selectedAddress,
                subtotal: total,
                cartItems: [{ productId: selectedProd, quantity, varientId: selectedProd.varient._id }],
            });
            navigate("/user/payment");
        } else {
            toast.error("Please select an address before proceeding.");
        }
    };

    const plus = () => setQuantity(prev => prev + 1);
    const minus = () => setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

    const handleAddressChange = (addressId) => setSelectedAddress(addressId);

    useEffect(() => {
        if (error) {
            toast.error(error.data.message);
        }
    }, [error]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-light-golden">
                {/* Order Summary on Small Screens */}
                <div className="md:hidden col-span-1 bg-white p-4">
                    <h1 className="py-6 border-b-2 text-xl text-yellow-800">Order Summary</h1>
                    {product && (
                        <>
                            <ul className="py-6 border-b space-y-6">
                                <li className="flex items-center space-x-4 border-b pb-4">
                                    <div className="w-24">
                                        <img src={product.images[0]} alt={product.name} className="rounded w-full" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-gray-600 text-md font-semibold">{product.name}</span>
                                        <span className="text-gray-400 text-sm">{product.productType}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={minus} className="bg-gray-200 text-gray-600 border-0 py-1 px-3 rounded-l">-</button>
                                        <span className="text-gray-900 px-3">{quantity}</span>
                                        <button onClick={plus} className="bg-gray-200 text-gray-600 border-0 py-1 px-3 rounded-r">+</button>
                                    </div>
                                </li>
                            </ul>
                            <div className="pt-4">
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Original Price</span>
                                    <span className="font-semibold text-gray-500">{originalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Discount ({discountPercent}%)</span>
                                    <span className="font-semibold text-gray-500">-{(originalPrice * discountPercent / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Discounted Price</span>
                                    <span className="font-semibold text-gray-500">{discountedPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Making Charges ({makingChargesPercent}%)</span>
                                    <span className="font-semibold text-gray-500">{makingChargesAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Sales Tax ({salesTaxPercent}%)</span>
                                    <span className="font-semibold text-gray-500">{salesTaxAmount.toFixed(2)}</span>
                                </div>
                                <div className="font-semibold text-xl flex justify-between py-4 text-gray-600">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="md:col-span-2 bg-yellow-50 p-4 space-y-8 mb-20 md:mb-0">
                    {/* Checkout Message */}
                    <div className="p-4 bg-white shadow rounded-md">
                        <div className="flex items-center border-b pb-4">
                            <div className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-3 text-sm font-medium text-yellow-800">Checkout</div>
                        </div>
                        <div className="text-sm mt-4 text-gray-500">Complete your shipping and payment details below.</div>
                    </div>

                    {isError ? (
                        <div className='text-center font-bold text-3xl'>{error.data.message}</div>
                    ) : (
                        <>
                            <button className="btn bg-yellow-400 text-black hover:bg-yellow-500 z-1" onClick={() => document.getElementById('add').showModal()}>
                                Add Address
                            </button>
                            <dialog id="add" className="modal">
                                <div className="modal-box bg-yellow-50">
                                    <h3 className="font-bold text-lg text-yellow-800">Add Address</h3>
                                    <Form />
                                </div>
                            </dialog>
                            {/* Address List with Checkbox */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {addresses && addresses.map((item) => (
                                    <div key={item._id} className="overflow-hidden group relative rounded-lg p-1 flex justify-center items-center">
                                        <label className="relative z-10 w-full bg-white p-6 rounded-lg flex items-center cursor-pointer">
                                            <input type="checkbox" className="form-checkbox h-5 w-5 text-yellow-500" checked={selectedAddress === item._id} onChange={() => handleAddressChange(item._id)} />
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
                            <button onClick={handlePayNow} className="submit-button px-4 py-3 rounded-full bg-yellow-400 text-white w-full text-xl font-semibold transition-colors hover:bg-yellow-500 mt-4">
                                Pay Now
                            </button>
                        </>
                    )}
                </div>

                {/* Order Summary on Large Screens */}
                <div className="hidden md:block md:col-span-1 bg-white p-4">
                    <h1 className="py-6 border-b-2 text-xl text-yellow-800">Order Summary</h1>
                    {product && (
                        <>
                            <ul className="py-6 border-b space-y-6">
                                <li className="flex items-center space-x-4 border-b pb-4">
                                    <div className="w-24">
                                        <img src={product.images[0]} alt={product.name} className="rounded w-full" />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <span className="text-gray-600 text-md font-semibold">{product.name}</span>
                                        <span className="text-gray-400 text-sm">{product.productType}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={minus} className="bg-gray-200 text-gray-600 border-0 py-1 px-3 rounded-l">-</button>
                                        <span className="text-gray-900 px-3">{quantity}</span>
                                        <button onClick={plus} className="bg-gray-200 text-gray-600 border-0 py-1 px-3 rounded-r">+</button>
                                    </div>
                                </li>
                            </ul>
                            <div className="border-t pt-4">
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Original Price</span>
                                    <span className="font-semibold text-gray-500">{originalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Discount ({discountPercent}%)</span>
                                    <span className="font-semibold text-gray-500">-{(originalPrice * discountPercent / 100).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Discounted Price</span>
                                    <span className="font-semibold text-gray-500">{discountedPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Making Charges ({makingChargesPercent}%)</span>
                                    <span className="font-semibold text-gray-500">{makingChargesAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between py-2 text-gray-600">
                                    <span>Sales Tax ({salesTaxPercent}%)</span>
                                    <span className="font-semibold text-gray-500">{salesTaxAmount.toFixed(2)}</span>
                                </div>
                                <div className="font-semibold text-xl flex justify-between py-4 text-gray-600">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
``

const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);
    const [addAddress, { isSuccess, isLoading, isError, error }] = useAddAddressMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            addressType: edit ? edit.addressType : '',
            houseNo: edit ? edit.houseNo : '',
            country: edit ? edit.country : '',
            state: edit ? edit.state : '',
            pincode: edit ? edit.pincode : '',
            mobile: edit ? edit.mobile : '',
        },
        validationSchema: yup.object({
            addressType: yup.string().required(),
            houseNo: yup.string().required(),
            country: yup.string().required(),
            state: yup.string().required(),
            pincode: yup.number().required(),
            mobile: yup.number().required(),
        }),
        onSubmit: async (values) => {
            await addAddress({ ...values, userId: user._id });
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address added successfully");
            formik.resetForm();
        }
        if (isError) {
            toast.error(error?.data.message);
        }
    }, [isSuccess, isError]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
                <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
                    Address Type
                </label>
                <input type="text" {...formik.getFieldProps('addressType')} className="mt-1 p-2 w-full rounded-md border border-gray-300" />
            </div>
            <div className="mt-4">
                <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">
                    House No
                </label>
                <input type="text" {...formik.getFieldProps('houseNo')} className="mt-1 p-2 w-full rounded-md border border-gray-300" />
            </div>
            <div className="mt-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                </label>
                <input type="text" {...formik.getFieldProps('country')} className="mt-1 p-2 w-full rounded-md border border-gray-300" />
            </div>
            <div className="mt-4">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                </label>
                <input type="text" {...formik.getFieldProps('state')} className="mt-1 p-2 w-full rounded-md border border-gray-300" />
            </div>
            <div className="mt-4">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                    Pincode
                </label>
                <input type="number" {...formik.getFieldProps('pincode')} className="mt-1 p-2 w-full rounded-md border border-gray-300" />
            </div>
            <div className="mt-4">
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                    Mobile
                </label>
                <input type="number" {...formik.getFieldProps('mobile')} className="mt-1 p-2 w-full rounded-md border border-gray-300" />
            </div>
            <div className="mt-6">
                <button type="submit" disabled={isLoading} className="submit-button px-4 py-2 rounded-md bg-yellow-400 text-white w-full text-md font-semibold transition-colors hover:bg-yellow-500">
                    {isLoading ? "Adding..." : "Add Address"}
                </button>
            </div>
        </form>
    );
};

export default CheckOut;
