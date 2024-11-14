import { v4 as uuid } from 'uuid';
import Icon from '@mdi/react';
import { mdiTrello, mdiCalendar } from '@mdi/js';


// import node module libraries
import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { ListGroup, Accordion, Card, Image, Badge, useAccordionButton, AccordionContext } from 'react-bootstrap';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import InverseLogo from './../../../assets/images/brand/logo/logo.png';
import GiftBox from './../../../assets/images/background/giftbox.png';

const DashboardMenu = [
    {
        id: uuid(),
        title: 'Dashboard',
        icon: 'home',
        children: [
            { id: uuid(), link: '/admin/dashboard', name: 'Overview' },
            { id: uuid(), link: '#', name: 'Analytics' }
        ]
    },

    {
        id: uuid(),
        title: 'Revenue',
        icon: 'book',
        children: [
            { id: uuid(), link: '', name: 'Overview' },
            { id: uuid(), link: '', name: 'Monthly' },
            { id: uuid(), link: '', name: 'Yearly' },
        ]
    },
    {
        id: uuid(),
        title: 'User',
        icon: 'user',
        children: [
            { id: uuid(), link: '/admin/user/management', name: 'User Management' },
            { id: uuid(), link: '/admin/user/address', name: 'User Address' },
            { id: uuid(), link: '/admin/user/reviews', name: 'User Reviews' },
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
            { id: uuid(), link: '/admin/cms/logo', name: 'Logo' },
            { id: uuid(), link: '/admin/cms/gallery', name: 'Gallery' },
            { id: uuid(), link: '/admin/cms/reviews', name: 'Reviews' },
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
            { id: uuid(), link: '/admin/order/overview', name: 'Order Overview' },
            { id: uuid(), link: '/admin/order/cart', name: 'Cart Orders' },
            { id: uuid(), link: '/admin/order/checkout', name: 'Checkout Orders' },
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
        title: 'Employee',
        icon: 'user',
        children: [
            { id: uuid(), link: '/admin/employee/add', name: 'Add Employee' },
            { id: uuid(), link: '/admin/employee/details', name: 'Employee Details' },
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
                <Accordion
                    defaultActiveKey="0"
                    as="ul"
                    className="navbar-nav flex-column"
                >
                    {DashboardMenu.map(function (menu, index) {
                        if (menu.grouptitle) {
                            return (
                                <Card bsPrefix="nav-item" key={index}>
                                    {/* group title item */}
                                    <div className="navbar-heading">{menu.title}</div>
                                    {/* end of group title item */}
                                </Card>
                            );
                        } else {
                            if (menu.children) {
                                return (
                                    <Fragment key={index}>
                                        {/* main menu / menu level 1 / root items */}
                                        <CustomToggle eventKey={menu.id} icon={menu.icon}>
                                            {menu.title}
                                            {menu.badge ? (
                                                <Badge
                                                    className="ms-1"
                                                    bg={menu.badgecolor ? menu.badgecolor : 'primary'}
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
                                                <ListGroup
                                                    as="ul"
                                                    bsPrefix=""
                                                    className="nav flex-column"
                                                >
                                                    {menu.children.map(function (
                                                        menuItem,
                                                        menuItemIndex
                                                    ) {
                                                        if (menuItem.children) {
                                                            return (
                                                                <Fragment key={menuItemIndex}>
                                                                    {/* second level with children */}
                                                                    <CustomToggle eventKey={menuItem.id}>
                                                                        {menuItem.title}
                                                                        {menuItem.badge ? (
                                                                            <Badge
                                                                                className="ms-1"
                                                                                bg={
                                                                                    menuItem.badgecolor
                                                                                        ? menuItem.badgecolor
                                                                                        : 'primary'
                                                                                }
                                                                            >
                                                                                {menuItem.badge}
                                                                            </Badge>
                                                                        ) : (
                                                                            ''
                                                                        )}
                                                                    </CustomToggle>
                                                                    <Accordion.Collapse
                                                                        eventKey={menuItem.id}
                                                                        bsPrefix="nav-item"
                                                                        as="li"
                                                                    >
                                                                        <Accordion
                                                                            className="navbar-nav flex-column"
                                                                            as="ul"
                                                                        >
                                                                            <ListGroup
                                                                                as="ul"
                                                                                bsPrefix=""
                                                                                className="nav flex-column"
                                                                            >
                                                                                {/* third level menu started  */}
                                                                                {menuItem.children.map(function (
                                                                                    subMenuItem,
                                                                                    subMenuItemIndex
                                                                                ) {
                                                                                    return subMenuItem.children ? (
                                                                                        <Fragment key={subMenuItemIndex}>
                                                                                            <CustomToggle
                                                                                                eventKey={subMenuItem.id}
                                                                                            >
                                                                                                {subMenuItem.title}
                                                                                                {subMenuItem.badge ? (
                                                                                                    <Badge
                                                                                                        className="ms-1"
                                                                                                        bg={
                                                                                                            subMenuItem.badgecolor
                                                                                                                ? subMenuItem.badgecolor
                                                                                                                : 'primary'
                                                                                                        }
                                                                                                    >
                                                                                                        {subMenuItem.badge}
                                                                                                    </Badge>
                                                                                                ) : (
                                                                                                    ''
                                                                                                )}
                                                                                            </CustomToggle>
                                                                                            <Accordion.Collapse
                                                                                                eventKey={subMenuItem.id}
                                                                                                bsPrefix="nav-item"
                                                                                                as="li"
                                                                                            >
                                                                                                <ListGroup
                                                                                                    as="ul"
                                                                                                    bsPrefix=""
                                                                                                    className="nav flex-column"
                                                                                                >
                                                                                                    {subMenuItem.children.map(
                                                                                                        function (
                                                                                                            thirdLevelItem,
                                                                                                            thirdLevelItemIndex
                                                                                                        ) {
                                                                                                            return (
                                                                                                                <ListGroup.Item
                                                                                                                    key={
                                                                                                                        thirdLevelItemIndex
                                                                                                                    }
                                                                                                                    as="li"
                                                                                                                    bsPrefix="nav-item"
                                                                                                                >
                                                                                                                    {/* third level with children */}
                                                                                                                    {generateLink(
                                                                                                                        thirdLevelItem
                                                                                                                    )}
                                                                                                                </ListGroup.Item>
                                                                                                            );
                                                                                                        }
                                                                                                    )}
                                                                                                </ListGroup>
                                                                                            </Accordion.Collapse>
                                                                                        </Fragment>
                                                                                    ) : (
                                                                                        <ListGroup.Item
                                                                                            key={subMenuItemIndex}
                                                                                            as="li"
                                                                                            bsPrefix="nav-item"
                                                                                        >
                                                                                            {/* third level without children */}
                                                                                            {generateLink(subMenuItem)}
                                                                                        </ListGroup.Item>
                                                                                    );
                                                                                })}
                                                                                {/* end of third level menu  */}
                                                                            </ListGroup>
                                                                        </Accordion>
                                                                    </Accordion.Collapse>
                                                                    {/* end of second level with children */}
                                                                </Fragment>
                                                            );
                                                        } else {
                                                            return (
                                                                <ListGroup.Item
                                                                    as="li"
                                                                    bsPrefix="nav-item"
                                                                    key={menuItemIndex}
                                                                >
                                                                    {/* second level without children */}
                                                                    {generateLink(menuItem)}
                                                                    {/* end of second level without children  */}
                                                                </ListGroup.Item>
                                                            );
                                                        }
                                                    })}
                                                </ListGroup>
                                            </Accordion>
                                        </Accordion.Collapse>
                                        {/* end of main menu / menu level 1 / root items */}
                                    </Fragment>
                                );
                            } else {
                                return (
                                    <Card bsPrefix="nav-item" key={index}>
                                        {/* menu item without any childern items like Help Center, Documentation and Changelog items*/}
                                        <Link
                                            to={menu.link}
                                            className={`nav-link ${location.pathname === menu.link ? 'active' : ''
                                                }`}
                                        >
                                            {typeof menu.icon === 'string' ? (
                                                <i className={`nav-icon fe fe-${menu.icon} me-2`}></i>
                                            ) : (
                                                menu.icon
                                            )}
                                            {menu.title}
                                            {menu.badge ? (
                                                <Badge
                                                    className="ms-1"
                                                    bg={menu.badgecolor ? menu.badgecolor : 'primary'}
                                                >
                                                    {menu.badge}
                                                </Badge>
                                            ) : (
                                                ''
                                            )}
                                        </Link>
                                        {/* end of menu item without any childern items */}
                                    </Card>
                                );
                            }
                        }
                    })}
                </Accordion>
                {/* end of Dashboard Menu */}

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