import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'react-feather';
import { Nav, Navbar, Form, Row, Col, Image, Dropdown, ListGroup, Badge } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';
import 'simplebar/dist/simplebar.min.css';
import { AppConfigContext } from '../../../context/Context';
import LightModeIcon from './../../../assets/images/svg/sun.svg';
import DarkModeIcon from './../../../assets/images/svg/moon.svg';
import useLocalStorage from '../../../hooks/useLocalStorage';

import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import Avatar1 from './../../../assets/images/avatar/avatar-1.jpg';
import NotificationList from './../../../data/Notification';
import { useSelector } from 'react-redux';
const AdminLayout = (props) => {
    const { children, className, overflowHidden } = props;
    const [showMenu, setShowMenu] = useState(true);
    const ToggleMenu = () => {
        return setShowMenu(!showMenu);
    };
    return (
        <div
            id="db-wrapper"
            className={`${overflowHidden ? 'chat-layout' : ''} ${showMenu ? '' : 'toggled'
                }`}
        >
            <div className="navbar-vertical navbar">
                <Sidebar
                    showMenu={showMenu}
                    onClick={(value) => setShowMenu(value)}
                />
            </div>
            <section id="page-content">
                <div className="header">
                    <HeaderDefault
                        data={{
                            showMenu: showMenu,
                            SidebarToggleMenu: ToggleMenu
                        }}
                    />
                </div>
                <div className={`container-fluid  ${className ? className : 'p-4'}`} style={{ marginTop: '50px' }}>
                    {children}
                    <Outlet />
                </div>
            </section>
        </div>
    );
};

const HeaderDefault = (props) => {
    return (
        <Fragment>
            <Navbar expanded="lg" className="navbar-default position-fixed z-5" style={{ width: props.data.showMenu ? 'calc(100% - 250px)' : "100%" }}>
                <div className="d-flex justify-content-between w-100">
                    <div className="d-flex align-items-center">
                        <Link
                            id="nav-toggle"
                            to="#"
                            onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}
                        >
                            <Menu size="18px" />
                        </Link>
                        <div className="ms-lg-3 d-none d-md-none d-lg-block ">
                            {/* <!-- Form --> */}
                            <Form className="d-flex align-items-center position-relative">
                                <Form.Control type="search" className="form-control ps-6" placeholder="Search Entire Dashboard" />

                            </Form>

                        </div>
                    </div>
                    <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
                        <QuickMenu />
                    </Nav>
                </div>
            </Navbar>
        </Fragment>
    );
};

const QuickMenu = () => {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)',
    });

    const Notifications = () => (
        <SimpleBar style={{ maxHeight: '300px' }}>
            <ListGroup variant="flush">
                {NotificationList.map((item, index) => (
                    <ListGroup.Item
                        className={`py-3 ${index === 0 ? 'bg-light' : ''}`}
                        key={index}
                    >
                        <div className="d-flex align-items-start gap-3">
                            <Image
                                src={item.image}
                                alt=""
                                className="avatar-md rounded-circle"
                            />
                            <div className="flex-grow-1">
                                <h5 className="fw-bold mb-1">{item.sender}</h5>
                                <p className="text-muted small mb-2">{item.message}</p>
                                <div className="d-flex text-muted small">
                                    <span className="me-3">
                                        <i className="fe fe-thumbs-up text-success me-1"></i>
                                        {item.date}
                                    </span>
                                    <span>{item.time}</span>
                                </div>
                            </div>
                            <div>
                                <GKTippy content="Mark as unread">
                                    <Link to="#" className="text-secondary">
                                        <DotBadge bg="secondary" />
                                    </Link>
                                </GKTippy>
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </SimpleBar>
    );
    const { admin } = useSelector(state => state.admin)
    return (
        <Fragment>
            <DarkLightMode />
            <ListGroup
                as="ul"
                bsPrefix="navbar-nav"
                className="navbar-right-wrap ms-2 d-flex align-items-center gap-3"
            >
                {/* Notifications */}
                <Dropdown as="li" className="position-relative">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=" "
                        className="btn btn-light btn-icon rounded-circle indicator indicator-primary"
                        id="dropdownNotification"
                    >
                        <i className="fe fe-bell"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        show={isDesktop}
                        className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-3 shadow-sm rounded"
                        aria-labelledby="dropdownNotification"
                    >
                        <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Notifications</h5>
                            <Link to="#" className="text-muted">
                                <i className="fe fe-settings"></i>
                            </Link>
                        </div>
                        <Notifications />
                        <div className="px-4 py-3 border-top text-center">
                            <Link to="/authentication/notifications" className="fw-bold text-primary">
                                See all Notifications
                            </Link>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>

                {/* User Profile */}
                <Dropdown as="li">
                    <Dropdown.Toggle as="a" bsPrefix=" " className="p-0">
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                            <Image alt="avatar" src={Avatar1} className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        show={isDesktop}
                        className="dashboard-dropdown dropdown-menu-end mt-4 shadow-sm rounded"
                        aria-labelledby="dropdownUser"
                    >
                        <Dropdown.Item className="py-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="avatar avatar-md avatar-indicators avatar-online">
                                    <Image alt="avatar" src={Avatar1} className="rounded-circle" />
                                </div>
                                <div>
                                    <h6 className="mb-0">{admin && admin.name}</h6>
                                    <p className="text-muted small mb-0">{admin && admin.email}</p>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <i className="fe fe-user me-2"></i> Profile
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="fe fe-star me-2"></i> Subscription
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="fe fe-settings me-2"></i> Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            <i className="fe fe-power me-2"></i> Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        </Fragment>
    );
};

const DotBadge = ({ children, bg = 'light-primary' }) => (
    <span className={`badge-dot bg-${bg} me-2`}></span>
);

DotBadge.propTypes = {
    bg: PropTypes.string,
};


// dark mode
const DarkLightMode = ({ className }) => {
    const ConfigContext = useContext(AppConfigContext);


    const { storageValue, setStorageValue, getStorageValue } = useLocalStorage(
        'skin',
        ConfigContext.appStats.skin
    );
    useEffect(() => {
        document
            .querySelector('html')
            .setAttribute('data-theme', getStorageValue('skin', 'light'));
        ConfigContext.setAppConfig(storageValue);
    }, [storageValue]);


    const changeColorMode = () => {
        setStorageValue(storageValue === 'light' ? 'dark' : 'light');
        ConfigContext.setAppConfig(storageValue);
    };
    return (
        <Fragment>
            <Link
                to="#"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={changeColorMode}
                className={`form-check form-switch theme-switch btn btn-light btn-icon rounded-circle ${className}`}
            >
                <Form.Check.Input
                    type="checkbox"
                    isValid
                    value={storageValue}
                    style={{ display: 'none' }}
                />
                <Form.Check.Label style={{ cursor: 'pointer' }}>
                    <Image src={storageValue === 'dark' ? DarkModeIcon : LightModeIcon} />
                </Form.Check.Label>
            </Link>
        </Fragment>
    );
};

const GKTippy = ({ children, content = 'Tool Tip Text', placement = 'top' }) => {
    const ConfigContext = useContext(AppConfigContext);
    return (
        <Tippy
            content={
                <small
                    className={`fw-bold ${ConfigContext.appStats.skin === 'light' ? 'text-dark' : ''
                        }`}
                >
                    {content}
                </small>
            }
            theme={ConfigContext.appStats.skin === 'light' ? 'dark' : 'light'}
            placement={placement}
            animation={'scale'}
        >
            {children}
        </Tippy>
    );
};
// ** PropTypes
GKTippy.propTypes = {
    placement: PropTypes.oneOf([
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end'
    ])
};
export default AdminLayout;
