import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/apis/userAuthApi';
import { filterContext, usefilter } from '../App';

const UserNavbar = () => {
    const { setSelectedType } = usefilter(filterContext);
    const [logoutUser] = useLogoutUserMutation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const productItems = ["rings", "earings", "necklace", "mangalsutra", "chain", "pendant", "nose-pin", "bangles", "forehead-ornament", "anklet", "coins"];
    const aboutItems = ["history", "vision", "mission", "team", "careers"];
    const babiesItems = ["bracelets", "anklets", "necklaces"];
    const goldItems = ["rings", "chains", "coins", "bars"];
    const platinumItems = ["rings", "bracelets", "necklaces"];

    const handleItemClick = (type, item) => {
        setSelectedType({ productType: item });
        setSidebarOpen(false);
    };



    return (
        <div className="bg-light-golden py-1">
            <div className="m-5 z-20 relative">
                <div className="navbar rounded-lg bg-amber-400">
                    <div className="flex-1 flex items-center space-x-4">
                        <Link to="/">
                            <div className="justify-center">
                                <img className="w-20 h-14" src="https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png" alt="" />
                            </div>
                        </Link>
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
                        <div className="hidden md:flex flex-1 space-x-4">
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                    Products
                                </div>
                                <div className="dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-[400px] p-2 shadow transition-all duration-300 ease-in-out">
                                    {productItems.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleItemClick('Products', item)}
                                            className="block p-2 hover:bg-yellow-200 cursor-pointer"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                    About
                                </div>
                                <div className="dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-[400px] p-2 shadow transition-all duration-300 ease-in-out">
                                    {aboutItems.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleItemClick('About', item)}
                                            className="block p-2 hover:bg-yellow-200 cursor-pointer"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                    Babies
                                </div>
                                <div className="dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-[400px] p-2 shadow transition-all duration-300 ease-in-out">
                                    {babiesItems.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleItemClick('Babies', item)}
                                            className="block p-2 hover:bg-yellow-200 cursor-pointer"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                    Gold
                                </div>
                                <div className="dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-[400px] p-2 shadow transition-all duration-300 ease-in-out">
                                    {goldItems.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleItemClick('Gold', item)}
                                            className="block p-2 hover:bg-yellow-200 cursor-pointer"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                    Platinum
                                </div>
                                <div className="dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-[400px] p-2 shadow transition-all duration-300 ease-in-out">
                                    {platinumItems.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleItemClick('Platinum', item)}
                                            className="block p-2 hover:bg-yellow-200 cursor-pointer"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="flex-none">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow transition-all duration-300 ease-in-out"
                            >
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <Link to="/user/cart" className="btn btn-primary btn-block">View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar hover:bg-gray-200 transition duration-300 ease-in-out"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-52 p-2 shadow transition-all duration-300 ease-in-out"
                            >
                                <li>
                                    <Link to="/user/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link to="/admin/dashboard" className='text-center'>Admin Page</Link></li>
                                <li><Link to="/user/allOrders" className='text-center'>My Orders</Link></li>
                                <li><button onClick={() => logoutUser()} type="button" className="btn">Logout User</button></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar for small screens */}
                <div
                    className={`fixed inset-0 z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } bg-amber-200 transition-transform duration-300 ease-in-out`}
                >
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button onClick={() => setSidebarOpen(false)} className="btn btn-ghost">X</button>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex flex-col space-y-2">
                            {productItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick('Products', item)}
                                    className="btn btn-ghost text-left"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                            {aboutItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick('About', item)}
                                    className="btn btn-ghost text-left"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                            {babiesItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick('Babies', item)}
                                    className="btn btn-ghost text-left"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                            {goldItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick('Gold', item)}
                                    className="btn btn-ghost text-left"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                            {platinumItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick('Platinum', item)}
                                    className="btn btn-ghost text-left"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;
