import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSection } from '../App';

const Sidebar = () => {
    const { currentSection, setCurrentSection } = useSection();
    const location = useLocation();

    const menuItems = [
        { section: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
        { section: 'orders', label: 'All Orders', path: '/admin/allOrders' },
        { section: 'users', label: 'All Users', path: '/admin/allUsers' },
        { section: 'addCarousel', label: 'Carousel ', path: '/admin/addCarousel' },
        { section: 'categories', label: 'Categories', path: '/admin/categories' },
        { section: 'contacts', label: 'Contacts', path: '/admin/get-contacts' },
        { section: 'paymentMethod', label: 'Payment Methods', path: '/admin/paymentMethod' },
        { section: 'addresses', label: 'Address And Taxes', path: '/admin/addresses' },
        { section: 'addsImages', label: 'Adds Images', path: '/admin/addsImage' },
        { section: 'navmenu', label: 'Nav MEnu', path: '/admin/navmenu' },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => item.path === currentPath);
        if (activeItem) {
            setCurrentSection(activeItem.section);
        }
    }, [location.pathname, setCurrentSection, menuItems]);

    return (
        <div className="hidden md:block inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-golden rounded-lg m-2">
            <div className="flex flex-col items-center mt-8">
                {/* Add user details if needed */}
            </div>

            <nav className="mt-10">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.section}
                        to={item.path}
                        onClick={() => setCurrentSection(item.section)}
                        className={`flex items-center px-6 py-2 mt-4 text-gray-100 transition-colors duration-200 ${currentSection === item.section ? 'bg-gray-700' : 'bg-transparent'} hover:bg-gray-600 rounded-lg`}
                    >
                        {item.label}
                    </NavLink>
                ))}

                {/* Logout button */}
                <NavLink
                    to="/admin/logout"
                    className="flex items-center px-6 py-2 mt-4 text-red-200 transition-colors duration-200 bg-transparent hover:bg-red-600 rounded-lg"
                >
                    Logout
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
