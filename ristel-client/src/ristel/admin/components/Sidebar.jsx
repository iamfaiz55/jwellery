import { v4 as uuid } from 'uuid';
import Icon from '@mdi/react';
import { mdiTrello, mdiCalendar } from '@mdi/js';


// import node module libraries
import { Fragment, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ListGroup, Accordion, Card, Image, Badge, useAccordionButton, AccordionContext } from 'react-bootstrap';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import InverseLogo from './../../../assets/images/brand/logo/logo.png';
import GiftBox from './../../../assets/images/background/giftbox.png';
import { useLogoutAdminMutation } from '../../../redux/apis/adminAuthApi';
import { toast } from 'react-toastify';

const DashboardMenu = [
    {
        id: uuid(),
        title: 'Dashboard',
        icon: 'home',
        link: '/admin/dashboard'
        // children: [
        //     { id: uuid(), link: '/admin/dashboard', name: 'Overview' },
        //     { id: uuid(), link: '#', name: 'Analytics' }
        // ]
    },

    // {
    //     id: uuid(),
    //     title: 'Revenue',
    //     icon: 'book',
    //     children: [
    //         { id: uuid(), link: '', name: 'Overview' },
    //         { id: uuid(), link: '', name: 'Monthly' },
    //         { id: uuid(), link: '', name: 'Yearly' },
    //     ]
    // },
    {
        id: uuid(),
        title: 'User',
        icon: 'user',
        children: [
            { id: uuid(), link: '/admin/user/management', name: 'User Management' },
            // { id: uuid(), link: '/admin/user/address', name: 'User Address' },
            // { id: uuid(), link: '/admin/user/reviews', name: 'User Reviews' },
            { id: uuid(), link: '/admin/user/active', name: 'Active Users' },
            { id: uuid(), link: '/admin/user/inactive', name: 'Inactive Users' },
            { id: uuid(), link: '/admin/user/online', name: 'Online Users' },
        ]
    },

    {
        id: uuid(),
        title: 'CMS',
        icon: 'book-open',
        children: [
            { id: uuid(), link: '/admin/cms/slider', name: 'Slider' },
            { id: uuid(), link: '/admin/cms/address', name: 'Address' },
            { id: uuid(), link: '/admin/cms/scroll-cards', name: 'Scrolling Cards' },
            { id: uuid(), link: '/admin/cms/logo', name: 'Logo' },
            { id: uuid(), link: '/admin/cms/gallery', name: 'Gallery' },
            { id: uuid(), link: '/admin/cms/schedule', name: 'Schedule' },
            { id: uuid(), link: '/admin/cms/navbar-manage', name: 'Navbar Manage' },
            // { id: uuid(), link: '/admin/cms/reviews', name: 'Reviews' },
            { id: uuid(), link: '/admin/cms/about', name: 'About' },
            { id: uuid(), link: '/admin/cms/contact', name: 'Contact' },
            { id: uuid(), link: '/admin/cms/privacy-policy', name: 'Privacy Policy' },
            { id: uuid(), link: '/admin/cms/terms-conditions', name: 'Terms & Conditions' },
            { id: uuid(), link: '/admin/cms/faq', name: 'FAQ' },

        ]
    },
    {
        id: uuid(),
        title: 'Orders',
        icon: 'shopping-bag',
        children: [
            // { id: uuid(), link: '/admin/order/overview', name: 'Order Overview' },
            // { id: uuid(), link: '/admin/order/cart', name: 'Cart Orders' },
            { id: uuid(), link: '/admin/order/all-orders', name: 'All Orders' },
            // { id: uuid(), link: '/admin/order/checkout', name: 'Checkout Orders' },
        ]
    },

    {
        id: uuid(),
        title: 'Products',
        icon: 'shopping-bag',
        children: [
            { id: uuid(), link: '/admin/product/add', name: 'Add Product' },
            { id: uuid(), link: '/admin/product/add-form', name: 'Add Product Form' },
            { id: uuid(), link: '/admin/product/details', name: 'Product Details' },
            { id: uuid(), link: '/admin/product/draft', name: 'Product Draft' },
            { id: uuid(), link: '/admin/product/schedule', name: 'Product Schedule' },
        ]
    },

    {
        id: uuid(),
        title: 'General',
        icon: 'user',
        children: [
            { id: uuid(), link: '/admin/general-product-settings', name: 'Product Settings' },
        ]
    },

    {
        id: uuid(),
        title: 'Apps',
        grouptitle: true
    },


    {
        id: uuid(),
        title: 'Task',
        icon: <Icon path={mdiTrello} className="nav-icon me-2" size={0.8} />,
        link: '/admin/task'
    },



    {
        id: uuid(),
        title: 'Calendar',
        icon: <Icon path={mdiCalendar} className="nav-icon me-2" size={0.8} />,
        link: '/admin/calendar'
    },





]


const Sidebar = (props) => {
    const location = useLocation();

    const [logoutAdmin, { isSuccess }] = useLogoutAdminMutation()

    const CustomToggle = ({ children, eventKey, icon }) => {
        const { activeEventKey } = useContext(AccordionContext);
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('Event Key : ' + eventKey)
        );
        const isCurrentEventKey = activeEventKey === eventKey;
        return (
            <li className="nav-item">
                <Link
                    className="nav-link "
                    onClick={decoratedOnClick}
                    to="#!"
                    data-bs-toggle="collapse"
                    data-bs-target="#navDashboard"
                    aria-expanded={isCurrentEventKey ? true : false}
                    aria-controls="navDashboard"
                >
                    {icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ''}{' '}
                    {children}
                </Link>
            </li>
        );
    };

    const generateLink = (item) => {
        return (
            <Link
                className={`nav-link ${location.pathname === item.link ? 'active' : ''
                    }`}
                to={item.link}
                onClick={(e) =>
                    isMobile ? props.onClick(!props.showMenu) : props.showMenu
                }
            >
                {item.name}
                {''}
                {item.badge ? (
                    <Badge
                        className="ms-1"
                        bg={item.badgecolor ? item.badgecolor : 'primary'}
                    >
                        {item.badge}
                    </Badge>
                ) : (
                    ''
                )}
            </Link>
        );
    };
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            toast.success("Logout Success")
            navigate("/admin-login")
        }
    }, [isSuccess])


    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <Fragment>
            <SimpleBar style={{ maxHeight: '100vh' }}>
                <div className="nav-scroller">
                    <Link className="" to="/">
                        <Image src={InverseLogo} className='img-fluid px-4 py-2' alt="" />
                    </Link>
                </div>
                {/* Dashboard Menu */}
                {/* Sidebar Content */}
                <div className="flex-grow-1">
                    <Accordion
                        defaultActiveKey="0"
                        as="ul"
                        className="navbar-nav flex-column"
                    >
                        {DashboardMenu.map(function (menu, index) {
                            if (menu.grouptitle) {
                                return (
                                    <Card bsPrefix="nav-item" key={index}>
                                        <div className="navbar-heading">{menu.title}</div>
                                    </Card>
                                );
                            } else if (menu.children) {
                                return (
                                    <Fragment key={index}>
                                        <CustomToggle eventKey={menu.id} icon={menu.icon}>
                                            {menu.title}
                                            {menu.badge ? (
                                                <Badge
                                                    className="ms-1"
                                                    bg={menu.badgecolor || 'primary'}
                                                >
                                                    {menu.badge}
                                                </Badge>
                                            ) : (
                                                ''
                                            )}
                                        </CustomToggle>
                                        <Accordion.Collapse
                                            eventKey={menu.id}
                                            as="li"
                                            bsPrefix="nav-item"
                                        >
                                            <Accordion className="navbar-nav flex-column" as="ul">
                                                <ListGroup as="ul" className="nav flex-column">
                                                    {menu.children.map((menuItem, menuItemIndex) => (
                                                        <ListGroup.Item
                                                            key={menuItemIndex}
                                                            as="li"
                                                            bsPrefix="nav-item"
                                                        >
                                                            {generateLink(menuItem)}
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Accordion>
                                        </Accordion.Collapse>
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <Card bsPrefix="nav-item" key={index}>
                                        <Link
                                            to={menu.link}
                                            className={`nav-link ${location.pathname === menu.link ? 'active' : ''}`}
                                        >
                                            <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                                            {menu.title}
                                            {menu.badge ? (
                                                <Badge
                                                    className="ms-1"
                                                    bg={menu.badgecolor || 'primary'}
                                                >
                                                    {menu.badge}
                                                </Badge>
                                            ) : (
                                                ''
                                            )}
                                        </Link>
                                    </Card>
                                );
                            }
                        })}
                    </Accordion>
                </div>
                {/* end of Dashboard Menu */}


                {/* Sidebar Footer */}
                <div className="sidebar-footer p-4">
                    <button
                        className="btn btn-danger w-100"
                        onClick={() => {
                            logoutAdmin()
                        }}
                    >
                        <i className="fe fe-power me-2"></i> Logout
                    </button>
                </div>

                <Card className="bg-dark-primary shadow-none text-center mx-4 my-8">
                    <Card.Body className="py-6">
                        <Image src={GiftBox} alt="" />
                        <div className="mt-4">
                            <h5 className="text-black">Mystery Box</h5>
                            <p className=" fs-6">
                                Upgrade your plan from a Free trial, to select ‘Business Plan’.
                                Start Now
                            </p>
                            <Link to="#!" className="btn btn-white btn-sm mt-2">
                                Unlock Now
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </SimpleBar>
        </Fragment>
    );
};


export default Sidebar;