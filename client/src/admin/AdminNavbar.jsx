import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useGetAllOrdersQuery } from '../redux/apis/adminApi';

const AdminNavbar = () => {
    const { data, isError, error } = useGetAllOrdersQuery();


    const navigate = useNavigate();
    const [logoutAdmin, { isSuccess }] = useLogoutAdminMutation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { admin } = useSelector(state => state.adminData)
    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Logout Success");
            navigate("/admin/login");
        }
    }, [isSuccess]);
    useEffect(() => {
        if (error) {
            logoutAdmin()
            toast.error(error && error.data.message)
        }
    }, [isError])


    return (
        <div className="bg-light-golden py-1">
            <div className="m-5 z-20 relative">
                <div className="navbar rounded-lg bg-amber-400">
                    <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <div className="justify-center">
                                    <img
                                        className="w-20 h-14"
                                        src="https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png"
                                        alt="Logo"
                                    />
                                </div>
                            </Link>
                            <div className="flex  ">
                                <div className="hidden lg:flex ">
                                    <Link to="/admin/dashboard" className="btn btn-ghost   hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Dashboard
                                    </Link>
                                    <Link to="/admin/allOrders" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        All Orders
                                    </Link>
                                    <Link to="/admin/allUsers" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        All Users
                                    </Link>
                                    <Link to="/admin/addCarousel" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Carousel
                                    </Link>
                                    <Link to="/admin/categories" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Categories
                                    </Link>
                                    <Link to="/admin/get-contacts" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Contacts
                                    </Link>
                                    <Link to="/admin/paymentMethod" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Payment Methods
                                    </Link>
                                    <Link to="/admin/addresses" className="btn btn-ghost  hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Addresses And Taxes
                                    </Link>

                                </div>
                                {
                                    admin && <div className="hidden lg:block absolute right-5">
                                        <button className="btn bg-golden hover:bg-yellow-600" onClick={e => logoutAdmin()}>Logout</button>
                                    </div>

                                }
                            </div>

                        </div>

                        <div className="lg:hidden flex-none">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar for small screens */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-30 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="w-64 bg-light-golden h-full p-4 relative">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="btn btn-ghost absolute top-4 right-4"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <ul className="space-y-4 mt-12">
                            <li>
                                <Link to="/admin/dashboard" className="block p-2 hover:bg-yellow-200">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/admin/allOrders" className="block p-2 hover:bg-yellow-200">All Orders</Link>
                            </li>
                            <li>
                                <Link to="/admin/allUsers" className="block p-2 hover:bg-yellow-200">All Users</Link>
                            </li>
                            <li>
                                <Link to="/admin/addCarousel" className="block p-2 hover:bg-yellow-200">Carousel</Link>
                            </li>
                            <li>
                                <Link to="/admin/categories" className="block p-2 hover:bg-yellow-200">Categories</Link>
                            </li>


                            <li>
                                <Link to="/admin/get-contacts" className="block p-2 hover:bg-yellow-200">Contact</Link>
                            </li>
                            <li>
                                <Link to="/admin/paymentMethod" className="block p-2 hover:bg-yellow-200">Payment Method</Link>
                            </li>
                            <li>
                                <Link to="/admin/addresses" className="block p-2 hover:bg-yellow-200">Address And Taxes</Link>
                            </li>

                            <li>
                                <button
                                    onClick={() => logoutAdmin()}
                                    type="button"
                                    className="btn bg-red-500 hover:bg-red-700 text-white w-full"
                                >
                                    Logout Admin
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;
