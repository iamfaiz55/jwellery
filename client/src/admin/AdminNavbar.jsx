import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const AdminNavbar = () => {
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
                            <div className="flex justify-between">
                                <div className="hidden md:flex flex-1 space-x-4">
                                    <Link to="/admin/dashboard" className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Dashboard
                                    </Link>
                                    <Link to="/admin/allOrders" className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                        All Orders
                                    </Link>
                                    <Link to="/admin/allUsers" className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                        All Users
                                    </Link>
                                    <Link to="/admin/addCarousel" className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                        Carousel
                                    </Link>
                                </div>
                                {
                                    admin && <div className="hidden md:block absolute right-5">
                                        <button className="btn bg-golden hover:bg-yellow-600" onClick={e => logoutAdmin()}>Logout</button>
                                    </div>

                                }
                            </div>

                        </div>

                        {/* This is the menu icon that will be on the right side */}
                        <div className="md:hidden flex-none">
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
                                <Link to="/admin/settings" className="block p-2 hover:bg-yellow-200">Settings</Link>
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
