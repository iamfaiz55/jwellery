import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useGetAllOrdersQuery } from '../redux/apis/adminApi';
import { useGetCompanyDetailsQuery } from '../redux/apis/openApi';

const AdminNavbar = () => {
    // const { data, isError, error } = useGetAllOrdersQuery();
    // console.log(data);
    const { data } = useGetCompanyDetailsQuery()
    // console.log(data);

    const [isDarkMode, setIsDarkMode] = useState(false);

    const navigate = useNavigate();
    const [logoutAdmin, { isSuccess }] = useLogoutAdminMutation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { admin } = useSelector(state => state.adminData)
    // console.log(admin);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Logout Success");
            navigate("/admin/login");
        }
    }, [isSuccess]);


    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // Apply dark mode class to the document root based on the state
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);



    return (
        <div className="bg-light-golden dark:bg-gray-800 py-1">
            <div className="m-5 z-20 relative">
                <div className="navbar rounded-lg bg-amber-400 dark:bg-gray-800">
                    <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <div className="justify-center">
                                    <img
                                        className="w-20 h-14"
                                        // src="https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png"
                                        src={data && data.logo || "https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png"}
                                        alt="Logo"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="md:hidden flex-none">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
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
                    <div className="w-64 bg-light-golden dark:bg-gray-800 h-full p-4 relative overflow-y-auto">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="btn btn-ghost absolute top-4 right-4 dark:text-white"
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
                        <ul className="space-y-4 mt-12 dark:text-gray-200" onClick={() => setSidebarOpen(false)}>
                            <li>
                                <Link to="/admin/dashboard" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/admin/allOrders" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">All Orders</Link>
                            </li>
                            <li>
                                <Link to="/admin/allUsers" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">All Users</Link>
                            </li>
                            <li>
                                <Link to="/admin/addCarousel" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Carousel</Link>
                            </li>
                            <li>
                                <Link to="/admin/categories" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Categories</Link>
                            </li>
                            <li>
                                <Link to="/admin/get-contacts" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Contact</Link>
                            </li>
                            <li>
                                <Link to="/admin/paymentMethod" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Payment Method</Link>
                            </li>
                            <li>
                                <Link to="/admin/addsImage" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Adds Images</Link>
                            </li>
                            <li>
                                <Link to="/admin/addresses" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Address And Taxes</Link>
                            </li>
                            <li>
                                <Link to="/admin/navmenu" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Nav Menus</Link>
                            </li>
                            <li>
                                <Link to="/admin/avg-income" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Monthly Income</Link>
                            </li>
                            <li>
                                <Link to="/admin/most-viewed" className="block p-2 hover:bg-yellow-200 dark:hover:bg-gray-700">Most Viewed Page</Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => logoutAdmin()}
                                    type="button"
                                    className="btn bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white w-full"
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
