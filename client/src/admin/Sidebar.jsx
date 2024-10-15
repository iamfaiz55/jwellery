import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSection } from '../App';
import { useLogoutAdminMutation } from '../redux/apis/adminAuthApi';
import { toast } from 'sonner';

const Sidebar = () => {
    const { currentSection, setCurrentSection } = useSection();
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
    const [logoutAdmin, { isSuccess }] = useLogoutAdminMutation();
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
        { section: 'navmenu', label: 'Nav Menu', path: '/admin/navmenu' },
        { section: 'avg-monthly-income', label: 'Avg Monthly Income', path: '/admin/avg-income' },
        // { section: 'history', label: 'History', path: '/admin/get-history' },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const activeItem = menuItems.find(item => item.path === currentPath);
        if (activeItem) {
            setCurrentSection(activeItem.section);
        }
    }, [location.pathname, setCurrentSection, menuItems]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);



    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Logout Success");
            navigate("/admin/login");
        }
    }, [isSuccess]);

    return (
        <div className="hidden md:block inset-y-0 left-0 z-30 w-60  overflow-y-auto bg-golden dark:bg-gray-800 rounded-lg m-2">
            <div className="flex flex-col items-center mt-8">
                {/* Add user details or logo if needed */}
            </div>

            <nav className="mt-5">
                {/* Iterate over menu items and render them */}
                {menuItems.map((item) => (
                    <NavLink
                        key={item.section}
                        to={item.path}
                        onClick={() => setCurrentSection(item.section)}
                        className={`flex items-center px-6 py-2 mt-4 text-gray-100 dark:text-gray-200 transition-colors duration-200 ${currentSection === item.section ? 'bg-gray-700 dark:bg-gray-700' : 'bg-transparent'} hover:bg-gray-600 dark:hover:bg-gray-600 rounded-lg`}
                    >
                        {item.label}
                    </NavLink>
                ))}

                {/* Logout button */}
                <div className="flex justify-center">
                    <button
                        // to="/admin/logout"
                        onClick={e => logoutAdmin()}
                        className="btn bg-red-500"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
