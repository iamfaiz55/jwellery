import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/apis/userAuthApi';

const getRandomJewelryItems = (count) => {
    const jewelryTypes = [
        'Necklace', 'Earrings', 'Bracelet', 'Ring', 'Pendant',
        'Charm', 'Bangle', 'Anklet', 'Brooch', 'Cufflinks',
        'Watch', 'Chain', 'Locket', 'Tiara', 'Crown',
        'Hairpin', 'Ear Cuff', 'Toe Ring', 'Jewelry Set', 'Keychain'
    ];
    const items = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * jewelryTypes.length);
        items.push(`${jewelryTypes[randomIndex]} `);
    }
    return items;
};



const UserNavbar = () => {
    const [logoutUser, { isSuccess }] = useLogoutUserMutation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const productItems = getRandomJewelryItems(20);
    const aboutItems = getRandomJewelryItems(20);
    const babiesItems = getRandomJewelryItems(20);
    const goldItems = getRandomJewelryItems(20);
    const platinumItems = getRandomJewelryItems(20);




    const dropdownContent = (items) => (
        <div className="dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-[400px] p-2 shadow transition-all duration-300 ease-in-out hidden md:flex">
            <div className="flex">
                <div className="w-1/2 pr-2 border-r border-gray-300">
                    {items.slice(0, Math.ceil(items.length / 2)).map((item, index) => (
                        <Link key={index} to={`/${item}`} className="block p-2 hover:bg-yellow-200">
                            {item}
                        </Link>
                    ))}
                </div>
                <div className="w-1/2 pl-2">
                    {items.slice(Math.ceil(items.length / 2)).map((item, index) => (
                        <Link key={index} to={`/${item}`} className="block p-2 hover:bg-yellow-200">
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

    return <div className='bg-light-golden py-1' >

        <div className='m-5  z-20 relative '>
            <div className="navbar rounded-lg bg-amber-400 ">
                <div className="flex-1 flex items-center space-x-4">
                    <Link to="/">
                        <div className='justify-center'>
                            <img className='w-20 h-14' src="https://static.vecteezy.com/system/resources/previews/027/990/875/non_2x/royal-frame-logo-generative-ai-free-png.png" alt="" />
                            {/* <p className='text-amber-600 font-serif text-sm ml-2 p-1'>FS Jwellers</p> */}
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
                        <div className="dropdown dropdown-hover">
                            <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                Products
                            </div>
                            {dropdownContent(productItems)}
                        </div>
                        <div className="dropdown dropdown-hover">
                            <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                About
                            </div>
                            {dropdownContent(aboutItems)}
                        </div>
                        <div className="dropdown dropdown-hover">
                            <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                Babies
                            </div>
                            {dropdownContent(babiesItems)}
                        </div>
                        <div className="dropdown dropdown-hover">
                            <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                Gold
                            </div>
                            {dropdownContent(goldItems)}
                        </div>
                        <div className="dropdown dropdown-hover">
                            <div className="btn btn-ghost hover:bg-gray-200 transition duration-300 ease-in-out">
                                Platinum
                            </div>
                            {dropdownContent(platinumItems)}
                        </div>
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
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow transition-all duration-300 ease-in-out transform opacity-0 hover:opacity-100 hover:scale-105"
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
                            className="menu menu-sm dropdown-content bg-light-golden rounded-box z-[1] mt-3 w-52 p-2 shadow transition-all duration-300 ease-in-out transform opacity-0 hover:opacity-100 hover:scale-105"
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
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="w-64 bg-light-golden h-full p-4">
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
                    <ul className="space-y-4">
                        <li>
                            <Link to="/" className="block p-2 hover:bg-yellow-200">Home</Link>
                        </li>
                        <li>
                            <button className="w-full text-left" onClick={() => setSidebarOpen(false)}>Products</button>
                            {dropdownContent(productItems)}
                        </li>
                        <li>
                            <button className="w-full text-left" onClick={() => setSidebarOpen(false)}>About</button>
                            {dropdownContent(aboutItems)}
                        </li>
                        <li>
                            <button className="w-full text-left" onClick={() => setSidebarOpen(false)}>Babies</button>
                            {dropdownContent(babiesItems)}
                        </li>
                        <li>
                            <button className="w-full text-left" onClick={() => setSidebarOpen(false)}>Gold</button>
                            {dropdownContent(goldItems)}
                        </li>
                        <li>
                            <button className="w-full text-left" onClick={() => setSidebarOpen(false)}>Platinum</button>
                            {dropdownContent(platinumItems)}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default UserNavbar;
