import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAddAddressMutation, useGetAddressesQuery, useUpdateProfileMutation } from '../redux/apis/userApi';
import * as yup from 'yup';
import { useFormik } from 'formik';

const Profile = () => {
    const [updateProfile, { isSuccess }] = useUpdateProfileMutation();
    const { user } = useSelector(state => state.userData);
    const { data } = useGetAddressesQuery(user._id);


    const fileInputRef = useRef();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleInput = (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('image', file);
        fd.append('userId', user._id);
        updateProfile(fd)
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Profile Update Success")
            window.location.reload();
        }
    }, [isSuccess])
    // useEffect(() => {
    //     if (user) {
    //         window.location.reload();
    //     }
    // }, [user]);


    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-light-golden">
            <div className="relative flex flex-col items-center rounded-2xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-light-golden shadow-2xl p-6">
                <div className="mt-4 mb-8 w-full text-center">
                    <div className="relative flex justify-center items-center">
                        <motion.img
                            src={user.image}
                            className="w-24 h-24 rounded-full border-4 border-golden cursor-pointer"
                            onClick={handleClick}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleInput}
                            className="hidden"
                        />
                    </div>
                    <h4 className="text-2xl font-bold text-navy-700 mt-2">
                        Hi, {user && user.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{user && user.email}</p>
                </div>
                <div className="mb-5">
                    <button className="btn bg-gray-400" onClick={() => document.getElementById('add').showModal()}>Add Address</button>
                    <dialog id="add" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Add New Address</h3>
                            <Form />
                        </div>
                    </dialog>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {data && data.map((item, index) => (
                        <motion.div
                            key={index}
                            className="overflow-hidden group relative rounded-lg p-1 flex justify-center items-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="hidden group-hover:block animate-gradient absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-900 via-gray-200/40 to-zinc-700 rounded-lg shadow-xl"></div>
                            <a className="relative z-10 w-full bg-white p-6 sm:p-8 rounded-lg">
                                <h3 className="text-xl font-bold text-gray-900">Home</h3>
                                <p className="mt-2 text-sm text-gray-500">House No: {item.houseNo}</p>
                                <p className="mt-2 text-sm text-gray-500">Country: {item.country}</p>
                                <p className="mt-2 text-sm text-gray-500">State: {item.state}</p>
                                <p className="mt-2 text-sm text-gray-500">Pincode: {item.pincode}</p>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
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
            pincode: yup.string().required("Enter pincode"),
            houseNo: yup.string().required("Enter houseNo"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Enter country"),
            addressType: yup.string().required("Select address type"),
            mobile: yup.string().required("Enter mobile number"),
        }),
        onSubmit: (values, { resetForm }) => {
            addAddress({ ...values, userId: user._id });
            resetForm();
        },
    });

    useEffect(() => {
        if (isSuccess) {
            toast.success("Address added successfully");
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

export default Profile;
