import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import * as yup from 'yup';
import {
    useAddAddressMutation,
    useDeleteAddressMutation,
    useGetAddressesQuery,
    useGetProfileQuery,
    useUpdateProfileDataMutation,
    useUpdateProfileMutation
} from '../redux/apis/userApi';
import { useFormik } from 'formik';
import Liked from '../components/Liked';
import AllOrders from './AllOrders';

const Profile = () => {
    const [isSmallSidebarOpen, setIsSmallSidebarOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState('profile');
    const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();
    const { user } = useSelector((state) => state.userData);
    const { data: userData } = useGetProfileQuery(user && user._id)
    // console.log(userData);
    const [updateProfileData, { isSuccess: updateSuccess, isLoading: updateLoading }] = useUpdateProfileDataMutation()
    const { data, error, isError } = useGetAddressesQuery(user && user._id);
    const [deleteAdress, { isSuccess: addressDeleteSuccess }] = useDeleteAddressMutation();
    const fileInputRef = useRef();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleInput = (e) => {
        const file = e.target.files[0];
        const fd = new FormData();
        fd.append('images', file);
        fd.append('userId', user._id);
        updateProfile(fd);
    };


    const formik = useFormik({
        initialValues: {
            name: user && user.name ? user.name : "",
            email: user && user.email ? user.email : "",
            mobile: user && user.mobile ? user.mobile : "",
        },
        validationSchema: yup.object({
            name: yup.string(),
            mobile: yup.string(),
            email: yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            updateProfileData({ ...values, _id: user._id })
            resetForm()
        }
    })
    useEffect(() => {
        if (isSuccess) {
            toast.success('Profile Update Success');
            location.reload()
        }
    }, [isSuccess]);

    useEffect(() => {
        if (addressDeleteSuccess) {
            toast.success('Your Address Was Deleted Successfully');
        }
    }, [addressDeleteSuccess]);


    useEffect(() => {
        if (updateSuccess) {
            toast.success("Profile Update Success")
            location.reload()
            document.getElementById("update").close()
        }
    }, [updateSuccess])

    return (
        <div className="flex  bg-light-golden">
            {/* Sidebar */}
            <div className="hidden md:block inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-golden rounded-lg m-2">
                <div className="flex flex-col items-center mt-20">
                    {
                        user && user.name && <h2 className="text-2xl font-bold text-white">Hi, {user.name}</h2>
                    }
                </div>

                <nav className="">
                    <SidebarButton
                        section="profile"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="addresses"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="liked"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="allOrders"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                </nav>
            </div>

            <div onClick={() => setIsSmallSidebarOpen(!isSmallSidebarOpen)} className={`mt-24 mb-20 fixed inset-y-0 left-0 z-40 w-48 overflow-y-auto bg-golden rounded-lg m-2 transition-transform transform ${isSmallSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                <div className="flex flex-col items-center">
                    {/* <h2 className="text-2xl font-bold text-white">Hi, {user.mobile}</h2> */}
                </div>
                <nav className="">
                    <SidebarButton
                        section="profile"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="addresses"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="liked"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <SidebarButton
                        section="allOrders"
                        currentSection={currentSection}
                        setCurrentSection={setCurrentSection}
                        setIsSmallSidebarOpen={setIsSmallSidebarOpen}
                    />
                    <div className="text-center">
                        <button className='btn w-24 mt-16 bg-gray-600 text-white'>Logout</button>
                    </div>
                </nav>
            </div>

            <div className="flex flex-col flex-1 p-6 overflow-hidden">
                {/* Toggle Button for Small Sidebar */}
                {/* {
                    !isSmallSidebarOpen && <button
                        aria-label={isSmallSidebarOpen ? 'Close menu' : 'Open menu'}
                        className="md:hidden p-2 text-sm fixed top-24 left-4 z-50 bg-golden text-white rounded-full transition duration-300 transform hover:scale-105"
                        onClick={() => setIsSmallSidebarOpen(!isSmallSidebarOpen)}
                    >
                        {isSmallSidebarOpen ? "" : 'Menu'}
                    </button>
                } */}


                <main className="flex-1 overflow-auto  mb-10">
                    {currentSection === 'profile' && (
                        <div className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex flex-col items-center">
                                {isLoading ? <>
                                    <span className="loading loading-spinner text-warning loading-lg"></span>

                                </> : (
                                    <motion.img
                                        src={user.image}
                                        className="w-24 h-24 rounded-full border-4 border-golden cursor-pointer"
                                        onClick={handleClick}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleInput}
                                    className="hidden"
                                />

                                {/* <h4 className="text-2xl font-bold mt-4">Hi, {user && user.mobile && user.mobile}</h4> */}
                                <div className="text-end">
                                    <button onClick={e => {
                                        document.getElementById("update").showModal()
                                    }} className='btn btn-sm bg-golden m-5'>Edit Profile</button>

                                </div>
                                <dialog id="update" className="modal border-yellow-400 rounded-lg">
                                    <div className="modal-box  relative">
                                        {
                                            updateLoading
                                                ? <>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
                                                        <div className="text-white text-lg">Loading...</div>
                                                    </div>
                                                </>
                                                : <>
                                                    <h3 className=" font-bold text-yellow-600">Update Profile</h3>

                                                    <form onSubmit={formik.handleSubmit}>
                                                        <input
                                                            {...formik.getFieldProps("name")}
                                                            type="text"
                                                            value={formik.values.name}
                                                            placeholder="Enter Your Name"
                                                            className="input input-bordered input-warning w-full my-2" />
                                                        <input
                                                            {...formik.getFieldProps("mobile")}
                                                            type="number"
                                                            value={formik.values.mobile}
                                                            placeholder="Enter Your Mobile Number"
                                                            className="input input-bordered input-warning w-full my-2" />
                                                        <input
                                                            {...formik.getFieldProps("email")}
                                                            type="email"
                                                            value={formik.values.email}
                                                            placeholder="Enter Your Email"
                                                            className="input input-bordered input-warning w-full my-2" />
                                                        <div className="text-right">
                                                            <button type='submit' className='btn m-3 bg-golden'>Update</button>
                                                            <button type='button' onClick={e => document.getElementById("update").close()} className='btn m-3 bg-golden'>close</button>
                                                        </div>
                                                    </form>
                                                </>
                                        }
                                    </div>
                                </dialog>

                                {/* <p className="text-gray-500">{user && user.email && user.email}</p> */}
                            </div>
                            {/* <!-- component --> */}
                            <>

                                < >
                                    <div class="">
                                        <div class="relative flex flex-col items-center rounded-[20px] w-full max-w-[700px] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">

                                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 w-full">
                                                <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                                    <p class="text-sm text-gray-600">Name</p>
                                                    <p class="text-base font-medium text-navy-700 dark:text-white">
                                                        {user && user.name && user.name}
                                                    </p>
                                                </div>

                                                <div class="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                                    <p class="text-sm text-gray-600">Email</p>
                                                    <p class="text-base font-medium text-navy-700 dark:text-white">
                                                        {user && user.email && user.email}                                                    </p>
                                                </div>

                                                <div class="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                                                    <p class="text-sm text-gray-600">Mobile</p>
                                                    <p class="text-base font-medium text-navy-700 dark:text-white">
                                                        {user && user.mobile}
                                                    </p>
                                                </div>






                                            </div>
                                        </div>
                                    </div>

                                </>
                            </>
                        </div>
                    )}
                    {/* address sectiomn */}
                    {
                        currentSection === "addresses" && <>
                            <div className="p-4 bg-white rounded-lg shadow-md">
                                <div className="mb-5">
                                    <button className="btn bg-gray-400" onClick={() => document.getElementById('add').showModal()}>Add Address</button>
                                    <dialog id="add" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Add New Address</h3>
                                            <Form />
                                        </div>
                                    </dialog>
                                </div>

                                {isError ? (
                                    <div className="text-center text-red-500">{error.data.message}</div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {data &&
                                            data.map((item, index) => (
                                                <motion.div
                                                    key={index}
                                                    className="relative p-4 bg-gray-100 rounded-lg shadow-md"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <button
                                                        onClick={() => deleteAdress(item._id)}
                                                        className="absolute top-2 right-2 p-2 bg-red-200 rounded-full"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 text-red-500"
                                                            viewBox="0 0 30 30"
                                                        >
                                                            <path d="M14.984 2.486a1 1 0 0 0-.984 1.014V4H8.5A1 1 0 0 0 7.486 5H6a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2h-1.487A1 1 0 0 0 21.5 4h-5.5v-.514a1 1 0 0 0-1.016-1.014zM6 9h1.793L9.777 24.234C9.911 25.241 10.763 26 11.777 26h8.445c1.014 0 1.867-.759 1.988-1.766L22.207 9H6z" />
                                                        </svg>
                                                    </button>
                                                    <h3 className="text-xl font-semibold">Home</h3>
                                                    <p>
                                                        <span className="font-medium">House No:</span> {item.houseNo}
                                                    </p>
                                                    <p>
                                                        <span className="font-medium">Country:</span> {item.country}
                                                    </p>
                                                    <p>
                                                        <span className="font-medium">State:</span> {item.state}
                                                    </p>
                                                    <p>
                                                        <span className="font-medium">Pincode:</span> {item.pincode}
                                                    </p>
                                                </motion.div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </>
                    }

                    {/* liked section */}
                    {
                        currentSection === "liked" && <>
                            <div className="p-4 bg-light-golden rounded-lg ">
                                {/* <div className="mb-5">
                                    <button className="btn bg-gray-400" onClick={() => document.getElementById('add').showModal()}>Add Address</button>
                                    <dialog id="add" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Add New Address</h3>
                                            <Form />
                                        </div>
                                    </dialog>
                                </div> */}

                                <Liked />
                            </div>
                        </>
                    }

                    {/* orders section */}
                    {
                        currentSection === "allOrders" && <>
                            <div className="p-4 bg-light-golden rounded-lg ">
                                {/* <div className="mb-5">
                                    <button className="btn bg-gray-400" onClick={() => document.getElementById('add').showModal()}>Add Address</button>
                                    <dialog id="add" className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Add New Address</h3>
                                            <Form />
                                        </div>
                                    </dialog>
                                </div> */}

                                <AllOrders />
                            </div>
                        </>
                    }
                </main>
            </div>
        </div>
    );
};

const SidebarButton = ({ section, currentSection, setCurrentSection, setIsSmallSidebarOpen }) => (
    <button
        onClick={() => {
            setCurrentSection(section);
            setIsSmallSidebarOpen(false);
        }}
        className={`flex items-center px-6 py-2 mt-4 text-gray-100 transition-colors duration-200 ${currentSection === section ? 'bg-gray-700' : 'bg-transparent'}`}
    >
        {section === 'profile' ? (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            </svg>
        ) : (
            // <></>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        )}
        <span className="mx-3 capitalize">{section}</span>
    </button>
);


const Form = ({ edit }) => {
    const { user } = useSelector((state) => state.userData);
    const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();
    // console.log(user);

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
            email: "",
        },
        validationSchema: yup.object({
            pincode: yup.string().required("Enter pincode"),
            houseNo: yup.string().required("Enter houseNo"),
            city: yup.string().required("Enter city"),
            state: yup.string().required("Enter state"),
            country: yup.string().required("Enter country"),
            addressType: yup.string().required("Select address type"),
            mobile: yup.string().required("Enter mobile number"),
            email: yup.string()
        }),
        onSubmit: (values, { resetForm }) => {
            if (!user.email) {
                const x = localStorage.getItem("user")
                const y = JSON.parse(x)
                const z = { ...y, email: values.email }
                localStorage.setItem("user", JSON.stringify(z))
            }
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
                    {/* { */}
                    {/* // user && user.email */}
                    {/* // ? <></> */}
                    {/* // : <></> */}
                    {/* // } */}
                    <input disabled={user && user.email} {...formik.getFieldProps("email")} type="email" placeholder="Enter your email" className="input w-full my-2" />
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
