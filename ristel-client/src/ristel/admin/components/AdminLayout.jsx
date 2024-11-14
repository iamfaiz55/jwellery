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
                        <div className="ms-lg-3 d-none d-md-none d-lg-block">
                            {/* <!-- Form --> */}
                            <Form className="d-flex align-items-center">
                                <span className="position-absolute ps-3 search-icon">
                                    <i className="fe fe-search"></i>
                                </span>
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
        query: '(min-width: 1224px)'
    });

    const Notifications = () => {
        return (
            <SimpleBar style={{ maxHeight: '300px' }}>
                <ListGroup variant="flush">
                    {NotificationList.map(function (item, index) {
                        return (
                            <ListGroup.Item
                                className={index === 0 ? 'bg-light' : ''}
                                key={index}
                            >
                                <Row>
                                    <Col>
                                        <Link className="text-body" to="#">
                                            <div className="d-flex">
                                                <Image
                                                    src={item.image}
                                                    alt=""
                                                    className="avatar-md rounded-circle"
                                                />
                                                <div className="ms-3">
                                                    <h5 className="fw-bold mb-1">{item.sender}</h5>
                                                    <p className="mb-3">{item.message}</p>
                                                    <span className="fs-6 text-muted">
                                                        <span>
                                                            <span className="fe fe-thumbs-up text-success me-1"></span>
                                                            {item.date}
                                                        </span>
                                                        <span className="ms-1">{item.time}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col xs="auto" className="text-center me-2">
                                        <GKTippy content="Mark as unread">
                                            <Link to="#">
                                                <DotBadge bg="secondary"></DotBadge>
                                            </Link>
                                        </GKTippy>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </SimpleBar>
        );
    };
    return (
        <Fragment>
            <DarkLightMode />
            <ListGroup
                as="ul"
                bsPrefix="navbar-nav"
                className="navbar-right-wrap ms-2 d-flex nav-top-wrap"
            >
                <Dropdown as="li">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=" "
                        className="text-dark icon-notifications me-lg-1  btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
                        id="dropdownNotification"
                    >
                        <i className="fe fe-bell"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        show={isDesktop ? true : false}
                        className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-3 py-0"
                        aria-labelledby="dropdownNotification"
                        align="end"
                    >
                        <div className="border-bottom px-3 pt-3 pb-3 d-flex justify-content-between align-items-end">
                            <span className="h4 mb-0">Notifications</span>
                            <Link to="# " className="text-muted">
                                <span className="align-middle">
                                    <i className="fe fe-settings me-1"></i>
                                </span>
                            </Link>
                        </div>
                        <Notifications />
                        <div className="border-top px-3 pt-3 pb-3">
                            <Link
                                to="/authentication/notifications"
                                className="text-link fw-semi-bold"
                            >
                                See all Notifications
                            </Link>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown as="li" className="ms-1">
                    <Dropdown.Toggle
                        as="a"
                        bsPrefix=" "
                        className="rounded-circle"
                        id="dropdownUser"
                    >
                        <div className="avatar avatar-md avatar-indicators avatar-online">
                            <Image alt="avatar" src={Avatar1} className="rounded-circle" />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                        show={isDesktop ? true : false}
                        className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
                        aria-labelledby="dropdownUser"
                        align="end"
                    >
                        <Dropdown.Item className="mt-3">
                            <div className="d-flex">
                                <div className="avatar avatar-md avatar-indicators avatar-online">
                                    <Image
                                        alt="avatar"
                                        src={Avatar1}
                                        className="rounded-circle"
                                    />
                                </div>
                                <div className="ms-3 lh-1">
                                    <h5 className="mb-1">Annette Black</h5>
                                    <p className="mb-0 text-muted">annette@geeksui.com</p>
                                </div>
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2">
                            <i className="fe fe-user me-2"></i> Profile
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3">
                            <i className="fe fe-star me-2"></i> Subscription
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <i className="fe fe-settings me-2"></i> Settings
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className="mb-3">
                            <i className="fe fe-power me-2"></i> Sign Out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </ListGroup>
        </Fragment>
    );
};
const DotBadge = ({ children, bg = 'light-primary' }) => {
    return (
        <span className="me-2">
            <Badge bg={bg} className="badge-dot"></Badge> {children}
        </span>
    );
};

DotBadge.propTypes = {
    bg: PropTypes.string
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
