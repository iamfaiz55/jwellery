import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAddAddressMutation, useGetAddressesQuery, useUpdateProfileMutation } from '../redux/apis/userApi';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import { useblock } from '../App';

const Profile = () => {
    // const { setBlock, block } = useblock()
    const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();
    const { user } = useSelector(state => state.userData);
    const { data } = useGetAddressesQuery(user._id);
    // console.log(block);


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
            {
                user.isBlock
                    ? <>
                        <h1>You Are Blocked From Admin</h1>
                    </>
                    : <>
                        <div className="relative flex flex-col items-center rounded-2xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto bg-light-golden shadow-2xl p-6">
                            <div className="mt-4 mb-8 w-full text-center">
                                <div className="relative flex justify-center items-center">
                                    {
                                        isLoading
                                            ? <>
                                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                            </>
                                            : <>
                                                <motion.img
                                                    src={user.image}
                                                    className="w-24 h-24 rounded-full border-4 border-golden cursor-pointer"
                                                    onClick={handleClick}
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </>
                                    }

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
                    </>
            }
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
