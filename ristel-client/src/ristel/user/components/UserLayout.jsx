import React, { Fragment, useState } from 'react'
import { RistelNavbarMegaMenu } from '../../components/PublicLayout'
import { Form, Link, Outlet } from 'react-router-dom'
import Sidebar from '../../admin/components/Sidebar'
import { Nav, Navbar } from 'react-bootstrap'
import { Menu } from 'react-feather'
import UserSidebar from './UserSidebar'

const UserLayout = () => {
    const [showMenu, setShowMenu] = useState(true);
    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };
    return <>

        <div
            id="db-wrapper"
            className={` 'chat-layout'`}>
            <div className="navbar-vertical navbar">
                {/* <Sidebar /> */}
                <UserSidebar />
            </div>
            <section id="page-content">
                <div className="header">
                    <RistelNavbarMegaMenu />
                    {/* <HeaderDefault
                        data={{
                            showMenu: showMenu,
                            SidebarToggleMenu: ToggleMenu
                        }}
                    /> */}
                </div>
                <div className={`container-fluid  'p-4'`} style={{ marginTop: '50px' }}>
                    {/* {children} */}
                    <Outlet />
                </div>
            </section>
        </div>

        <h1>USER LAYOUT</h1>

    </>
}






export default UserLayout