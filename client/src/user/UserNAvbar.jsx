import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../redux/apis/userAuthApi';
import { filterContext, usefilter } from '../App';
import { useSelector } from 'react-redux';
import { useGetAllCartItemsQuery } from '../redux/apis/userApi';
import { useGetAllCAtegoriesQuery, useGetAllMenuItemsQuery, useGetCompanyDetailsQuery, useGetTaxesQuery } from '../redux/apis/openApi';

const UserNavbar = () => {
    const { data: companyDetails } = useGetCompanyDetailsQuery();
    const { data: navmenus } = useGetAllMenuItemsQuery();
    // console.log(navmenus);

    const { data: taxes } = useGetTaxesQuery();
    const navigate = useNavigate();
    const { setSelectedType } = usefilter(filterContext);
    const [logoutUser] = useLogoutUserMutation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useSelector(state => state.userData);
    const { data: cartItems, isError, error } = useGetAllCartItemsQuery(user && user._id);
    // console.log(cartItems);

    const { data: allCategories } = useGetAllCAtegoriesQuery();

    useEffect(() => {
        if (error && error.status === 409) {
            logoutUser();
        }
    }, [error, logoutUser]);
    console.log(error);


    // console.log(cartItems);

    const subtotal = cartItems?.reduce((acc, item) => {
        const productVariant = item.productId.varient.find(variant => variant._id === item.varientId);
        return productVariant ? acc + (productVariant.price * item.quantity) : acc;
    }, 0);

    const discount = taxes?.find(tax => tax.taxName === 'Discount')?.percent || 0;
    const discountAmount = (subtotal * discount) / 100;
    const totalAfterDiscount = subtotal - discountAmount;


    return <>
        <div className="bg-light-golden dark:bg-gray-800 py-2">
            <div className="m-2 md:m-5 z-20 relative">
                <div className="navbar rounded-lg bg-light-golden dark:bg-gray-800">
                    <div className="flex-1 flex items-center space-x-4">
                        <Link to="/">
                            <div className="justify-center">
                                <img className="w-16 h-12 md:w-20 md:h-14" src={companyDetails && companyDetails.logo} alt="Logo" />
                            </div>
                        </Link>
                        <div className="md:hidden flex-none">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden md:flex flex-grow justify-center space-x-6">
                            {/* Products Dropdown */}
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-1000 ease-in-out">
                                    Products
                                </div>
                                <div className="dropdown-content bg-light-golden dark:bg-gray-800 rounded-box z-[1] mt-3 w-[180px] p-2 shadow transition-all duration-1000 ease-in-out">
                                    {allCategories?.map((category) => (
                                        <Link
                                            key={category._id}
                                            onClick={() => setSelectedType(category.category)}
                                            className="block py-1 px-2 hover:bg-gray-300 dark:hover:bg-gray-600 rounded text-sm font-bold"
                                        >
                                            {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Menus Dropdown */}
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-1000 ease-in-out">
                                    Menus
                                </div>
                                <div className="dropdown-content bg-light-golden dark:bg-gray-800 w-96 rounded-box z-[1] mt-3 p-4 shadow transition-all duration-1000 ease-in-out">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-96 p-5">
                                        {navmenus?.map((menu) => (
                                            <div key={menu._id}>
                                                <div className="font-bold text-sm md:text-base text-center">{menu.menuitem}</div>
                                                <div>
                                                    {menu.children?.map((child) => (
                                                        <Link
                                                            key={child._id}
                                                            className="block p-2 md:p-4 rounded-lg transition-all duration-300 ease-in-out"
                                                        >
                                                            <img
                                                                src={child.image}
                                                                width={100}
                                                                alt={child.menuitem}
                                                                className="rounded-lg w-8 sm:ml-5 lg:ml-2"
                                                            />
                                                            <div className="text-center text-sm">{child.menuitem}</div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* About Dropdown */}
                            <div className="dropdown dropdown-hover relative">
                                <div className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-1000 ease-in-out">
                                    About
                                </div>
                                <div className="dropdown-content bg-light-golden dark:bg-gray-800 rounded-box z-[1] mt-3 w-[180px] p-2 shadow transition-all duration-1000 ease-in-out">
                                    <Link to="/user/mission" className="block py-1 px-2 font-bold text-sm">Mission</Link>
                                    <Link to="/user/vision" className="block py-1 px-2 font-bold text-sm">Vision</Link>
                                    <Link to="/user/about" className="block py-1 px-2 font-bold text-sm">About</Link>
                                </div>
                            </div>

                            <Link to="/user/contact" className="btn btn-ghost text-sm md:text-base">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Cart and Profile */}
                    <div className="flex-none flex items-center space-x-2 md:space-x-4">
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                            >
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">{cartItems && cartItems.length}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-44 shadow transition-all duration-300 ease-in-out"
                            >
                                <div className="card-body bg-light-golden dark:bg-gray-800">
                                    <span className="text-md font-bold">{cartItems && cartItems.length} Items</span>
                                    <span className="font-bold">Total: ${totalAfterDiscount ? totalAfterDiscount.toFixed(2) : ""}</span>
                                    <div className="card-actions">
                                        <Link to="/user/cart" className="btn bg-golden btn-block text-sm">View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Icon */}
                        <div className="dropdown dropdown-end hidden sm:block">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out"
                            >
                                {user ? (
                                    <div className="w-8 md:w-10 rounded-full">
                                        <img alt="User Profile" src={user.image || 'https://via.placeholder.com/150'} />
                                    </div>
                                ) : (
                                    <div className="w-8 md:w-10 rounded-full bg-gray-300"></div>
                                )}
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-light-golden dark:bg-gray-800 rounded-box z-[1] mt-3 w-40 md:w-52 p-2 shadow transition-all duration-300 ease-in-out"
                            >
                                {user ? (
                                    <>
                                        <li>
                                            <Link to="/user/profile" className="justify-between text-sm">Profile</Link>
                                        </li>
                                        <li><Link to="/admin/dashboard" className="text-sm text-center">Admin Page</Link></li>
                                    </>
                                ) : (
                                    <li>
                                        <button onClick={() => navigate("/user/login")} type="button" className="btn text-sm">
                                            Login
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar for small screens */}
                <div
                    className={`fixed inset-0 z-40 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} bg-amber-200 dark:bg-gray-700 transition-transform duration-300 ease-in-out overflow-y-auto`}
                    style={{ maxHeight: '100vh' }}
                >
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-lg font-bold">Menu</h2>
                        <button onClick={() => setSidebarOpen(false)} className="btn btn-ghost">X</button>
                    </div>
                    <div className="p-4 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <h3 className="font-semibold text-lg">Categories</h3>
                            {allCategories?.map((category) => (
                                <Link
                                    key={category._id}
                                    onClick={() => {
                                        setSidebarOpen(false);
                                        setSelectedType(category.category);
                                    }}
                                    className="block py-1 px-2 bg-light-golden dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
                                >
                                    {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <Link to="/user/contact" className="btn btn-ghost">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </>
};

export default UserNavbar;
