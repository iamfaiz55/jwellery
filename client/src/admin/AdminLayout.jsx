import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex bg-light-golden h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <AdminNavbar />
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
