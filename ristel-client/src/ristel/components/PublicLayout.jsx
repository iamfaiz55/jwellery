import React from 'react'
import { Outlet } from 'react-router-dom'
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Navbar, Nav, Container, ListGroup } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { mdiAccount, mdiCartOutline, mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';
import Icon from '@mdi/react';
import { NavDropdown, Badge } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { Row, Col } from 'react-bootstrap';
// import { Icon } from '@mdi/react';
// import { mdiCartOutline } from '@mdi/js';
import Logo from './../../assets/images/brand/logo/logo.png';
import FooterLogo from './../../assets/images/brand/logo/logo.png';
import AppStore from './../../assets/images/svg/appstore.svg';
import PlayStore from './../../assets/images/svg/playstore.svg';
import RistelFooterWithLinks from './RistelFooterWithLinks';
import { useGetAllCartItemsQuery } from '../../redux/apis/userApi';
import { useSelector } from 'react-redux';
import { useGetCompanyDetailsQuery } from '../../redux/apis/publicApi';

const PublicLayout = () => {
    return <>
        <RistelNavbarMegaMenu />
        {<Outlet />}
        <RistelFooterWithLinks />
    </>
}


export const RistelNavbarMegaMenu = () => {
    const { data: companyDetails } = useGetCompanyDetailsQuery();

    const [expandedMenu, setExpandedMenu] = useState(false);
    const { user } = useSelector(state => state.user);
    const { data: cartItems } = useGetAllCartItemsQuery(user && user._id);

    return (
        <Fragment>
            <Navbar
                onToggle={(collapsed) => setExpandedMenu(collapsed)}
                expanded={expandedMenu}
                expand="lg"
                className="navbar-default "
            >
                <Container className="px-0 ps-2">
                    <div className="d-flex">
                        <Navbar.Brand as={Link} to="/">
                            {/* <Image src={Logo} height={40} alt="" style={{ marginTop: "-2px" }} /> */}
                            <Image src={companyDetails && companyDetails.logo} height={40} alt="" style={{ marginTop: "-2px" }} />
                        </Navbar.Brand>
                        {/* <CategoriesDropDown /> */}
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="icon-bar top-bar mt-0"></span>
                        <span className="icon-bar middle-bar"></span>
                        <span className="icon-bar bottom-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <MegaMenu />
                            {NavbarDefault.slice(1, 100).map((item, index) => {
                                if (item.children === undefined) {
                                    return (
                                        <Nav.Link key={index} as={Link} to={item.link}>
                                            {item.menuitem}
                                        </Nav.Link>
                                    );
                                } else {
                                    return (
                                        <NavMegaDropdown
                                            item={item}
                                            key={index}
                                            onClick={(value) => setExpandedMenu(value)}
                                        />
                                    );
                                }
                            })}

                            {/* <DocumentMenu /> */}
                        </Nav>

                        {/* Right side quick / shortcut menu  */}
                        <div className="ms-auto mt-3 mt-lg-0">
                            <div className="d-flex align-items-center">
                                {/* <DarkLightMode /> */}
                                <Link to="/user" className="btn btn-outline-primary ms-3">
                                    <Icon path={mdiAccount} size={0.7} />
                                </Link>
                                <Link to="/cart" className="btn btn-outline-primary ms-3 position-relative">
                                    <Icon path={mdiCartOutline} size={0.7} />

                                    {cartItems && cartItems.length > 0 && (
                                        <span className="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-primary">
                                            {cartItems && cartItems.length}
                                        </span>
                                    )}
                                </Link>
                                {/* <Link to="#" className="btn btn-primary ms-1">
									Sign up
								</Link> */}
                            </div>
                        </div>
                        {/* end of right side quick / shortcut menu  */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

// navbar data 
const NavbarDefault = [
    {
        id: uuid(),
        menuitem: 'Browse',
        link: '#',
        children: [
            {
                id: uuid(),
                menuitem: 'Web Development',
                link: '#',
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Bootstrap',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'React',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'GraphQl',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Gatsby',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Grunt',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Svelte',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Meteor',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'HTML5',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Angular',
                        link: '/marketing/course-category/'
                    }
                ]
            },
            {
                id: uuid(),
                menuitem: 'Design',
                link: '#',
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Graphic Design',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Illustrator',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'UX / UI Design',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Figma Design',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Adobe XD',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Sketch',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Icon Design',
                        link: '/marketing/course-category/'
                    },
                    {
                        id: uuid(),
                        menuitem: 'Photoshop',
                        link: '/marketing/course-category/'
                    }
                ]
            },
            {
                id: uuid(),
                menuitem: 'Mobile App',
                link: '/marketing/course-category/'
            },
            {
                id: uuid(),
                menuitem: 'IT Software',
                link: '/marketing/course-category/'
            },
            {
                id: uuid(),
                menuitem: 'Marketing',
                link: '/marketing/course-category/'
            },
            {
                id: uuid(),
                menuitem: 'Music',
                link: '/marketing/course-category/'
            },
            {
                id: uuid(),
                menuitem: 'Life Style',
                link: '/marketing/course-category/'
            },
            {
                id: uuid(),
                menuitem: 'Business',
                link: '/marketing/course-category/'
            },
            {
                id: uuid(),
                menuitem: 'Photography',
                link: '/marketing/course-category/'
            }
        ]
    },
    {
        id: uuid(),
        menuitem: 'Diamond',
        link: '#',
        children: [
            {
                id: uuid(),
                header: true,
                header_text: 'Diamond Collections'
            },
            {
                id: uuid(),
                menuitem: 'Rings',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Earrings',
                link: "#"
            },
            {
                id: uuid(),
                menuitem: 'Pendant',
                link: "#",
                badgecolor: 'primary',
                badge: 'New'
            },
            {
                id: uuid(),
                menuitem: 'Necklaces',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Bracelets and Bangles',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Mangalsutra',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Cufflinks',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Chain',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Nath',
                link: "#",
            }
        ]
    },
    {
        id: uuid(),
        menuitem: 'Gold',
        link: '#',
        children: [
            {
                id: uuid(),
                header: true,
                header_text: 'Gold Collections'
            },
            {
                id: uuid(),
                menuitem: 'Rings',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Earrings',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Pendant',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Necklaces',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Bracelets and Bangles',
                link: "#",

            },
            {
                id: uuid(),
                menuitem: 'Mangalsutra',
                link: "#",

            },
            {
                id: uuid(),
                menuitem: 'Cufflinks',
                link: "#",

            },
            {
                id: uuid(),
                menuitem: 'Chain',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Nath',
                link: "#",
            }
        ]
    },
    {
        id: uuid(),
        menuitem: 'Silver',
        link: '#',
        children: [
            {
                id: uuid(),
                header: true,
                header_text: 'Silver Collections'
            },
            {
                id: uuid(),
                menuitem: 'Rings',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Earrings',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Pendant',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Necklaces',
                link: "#",
                children: [
                    {
                        id: uuid(),
                        menuitem: 'Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Jhumkas',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Daily Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Drop and Danglers',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Hoop and Huggies',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Office Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Men Studs',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Kids Wear',
                    },
                    {
                        id: uuid(),
                        menuitem: 'Party Wear',
                    },
                ]
            },
            {
                id: uuid(),
                menuitem: 'Bracelets and Bangles',
                link: "#",

            },
            {
                id: uuid(),
                menuitem: 'Mangalsutra',
                link: "#",

            },
            {
                id: uuid(),
                menuitem: 'Cufflinks',
                link: "#",

            },
            {
                id: uuid(),
                menuitem: 'Chain',
                link: "#",
            },
            {
                id: uuid(),
                menuitem: 'Nath',
                link: "#",
            }
        ]
    },
];

// Nabar dropdown
const NavMegaDropdown = (props) => {
    const { item, onClick } = props;

    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    const getTitle = (item) => {
        return item.badge ? (
            <Fragment>
                {item.menuitem}
                <Badge
                    className="ms-1"
                    bg={item.badgecolor ? item.badgecolor : 'primary'}
                >
                    {item.badge}
                </Badge>
            </Fragment>
        ) : (
            item.menuitem
        );
    };

    const NavbarDesktop = () => {
        return (
            <NavDropdown title={item.menuitem} show>
                {item.children.map((submenu, submenuindex) => {
                    if (submenu.divider || submenu.header) {
                        return submenu.divider ? (
                            <NavDropdown.Divider bsPrefix="mx-3" key={submenuindex} />
                        ) : (
                            <h4 className="dropdown-header" key={submenuindex}>
                                {/* Second level menu heading - its not a menu item */}
                                {submenu.header_text}
                            </h4>
                        );
                    } else {
                        if (submenu.children === undefined) {
                            return (
                                <NavDropdown.Item
                                    key={submenuindex}
                                    as={Link}
                                    to={submenu.link}
                                    onClick={(expandedMenu) => onClick(!expandedMenu)}
                                >
                                    {/* Second level menu item without having sub menu items */}
                                    {submenu.menuitem}
                                    {submenu.badge && (
                                        <Badge
                                            className="ms-1"
                                            bg={submenu.badgecolor ? submenu.badgecolor : 'primary'}
                                        >
                                            {submenu.badge}
                                        </Badge>
                                    )}
                                </NavDropdown.Item>
                            );
                        } else {
                            return (
                                <NavDropdown
                                    title={getTitle(submenu)}
                                    key={submenuindex}
                                    bsPrefix="dropdown-item d-block"
                                    className={`dropdown-submenu dropend py-0 `}
                                    show
                                >
                                    {submenu.children.map((submenuitem, submenuitemindex) => {
                                        if (submenuitem.divider || submenuitem.header) {
                                            return submenuitem.divider ? (
                                                <NavDropdown.Divider
                                                    bsPrefix="mx-3"
                                                    key={submenuitemindex}
                                                />
                                            ) : (
                                                <Fragment key={submenuitemindex}>
                                                    {/* Third level menu heading with description  */}
                                                    <h5 className="dropdown-header text-dark">
                                                        {submenuitem.header_text}
                                                    </h5>
                                                    <p className="dropdown-text mb-0 text-wrap">
                                                        {submenuitem.description}
                                                    </p>
                                                </Fragment>
                                            );
                                        } else {
                                            if (submenuitem.children === undefined) {
                                                return (
                                                    <Fragment key={submenuitemindex}>
                                                        {submenuitem.type === 'button' ? (
                                                            <div className="px-3 d-grid">
                                                                {/* Third Level with button format menu item */}
                                                                <Link
                                                                    to={submenuitem.link}
                                                                    className="btn btn-sm btn-primary text-center"
                                                                >
                                                                    {submenuitem.menuitem}
                                                                </Link>
                                                            </div>
                                                        ) : (
                                                            <NavDropdown.Item
                                                                as={Link}
                                                                to={submenuitem.link}
                                                                onClick={(expandedMenu) =>
                                                                    onClick(!expandedMenu)
                                                                }
                                                            >
                                                                {/* Third Level menu item */}
                                                                {submenuitem.menuitem}
                                                            </NavDropdown.Item>
                                                        )}
                                                    </Fragment>
                                                );
                                            } else {
                                                return (
                                                    <NavDropdown
                                                        title={getTitle(submenuitem)}
                                                        key={submenuitemindex}
                                                        bsPrefix="dropdown-item d-block"
                                                        className={`dropdown-submenu dropend py-0 `}
                                                        show
                                                    >
                                                        {submenuitem.children.map(
                                                            (submenuitem4, submenuitem4index) => {
                                                                return (
                                                                    <NavDropdown.Item
                                                                        as={Link}
                                                                        to={submenuitem4.link}
                                                                        onClick={(expandedMenu) =>
                                                                            onClick(!expandedMenu)
                                                                        }
                                                                        key={submenuitem4index}
                                                                    >
                                                                        {/* Fourth Level menu item */}
                                                                        {submenuitem4.menuitem}
                                                                    </NavDropdown.Item>
                                                                );
                                                            }
                                                        )}
                                                    </NavDropdown>
                                                );
                                            }
                                        }
                                    })}
                                </NavDropdown>
                            );
                        }
                    }
                })}
            </NavDropdown>
        );
    };

    const NavbarMobile = () => {
        return (
            <NavDropdown title={item.menuitem}>
                {item.children.map((submenu, submenuindex) => {
                    if (submenu.divider || submenu.header) {
                        return submenu.divider ? (
                            <NavDropdown.Divider bsPrefix="mx-3" key={submenuindex} />
                        ) : (
                            <h4 className="dropdown-header" key={submenuindex}>
                                {/* Second level menu heading - its not a menu item */}
                                {submenu.header_text}
                            </h4>
                        );
                    } else {
                        if (submenu.children === undefined) {
                            return (
                                <NavDropdown.Item
                                    key={submenuindex}
                                    as={Link}
                                    to={submenu.link}
                                    onClick={(expandedMenu) => onClick(!expandedMenu)}
                                >
                                    {/* Second level menu item without having sub menu items */}
                                    {submenu.menuitem}
                                    {submenu.badge && (
                                        <Badge
                                            className="ms-1"
                                            bg={submenu.badgecolor ? submenu.badgecolor : 'primary'}
                                        >
                                            {submenu.badge}
                                        </Badge>
                                    )}
                                </NavDropdown.Item>
                            );
                        } else {
                            return (
                                <NavDropdown
                                    title={getTitle(submenu)}
                                    key={submenuindex}
                                    bsPrefix="dropdown-item d-block"
                                    className={`dropdown-submenu dropend py-0 `}
                                >
                                    {submenu.children.map((submenuitem, submenuitemindex) => {
                                        if (submenuitem.divider || submenuitem.header) {
                                            return submenuitem.divider ? (
                                                <NavDropdown.Divider
                                                    bsPrefix="mx-3"
                                                    key={submenuitemindex}
                                                />
                                            ) : (
                                                <Fragment key={submenuitemindex}>
                                                    {/* Third level menu heading with description  */}
                                                    <h5 className="dropdown-header text-dark">
                                                        {submenuitem.header_text}
                                                    </h5>
                                                    <p className="dropdown-text mb-0 text-wrap">
                                                        {submenuitem.description}
                                                    </p>
                                                </Fragment>
                                            );
                                        } else {
                                            return (
                                                <Fragment key={submenuitemindex}>
                                                    {submenuitem.type === 'button' ? (
                                                        <div className="px-3 d-grid">
                                                            {/* Third Level with button format menu item */}
                                                            <Link
                                                                to={submenuitem.link}
                                                                className="btn-sm btn-primary text-center"
                                                            >
                                                                {submenuitem.menuitem}
                                                            </Link>
                                                        </div>
                                                    ) : (
                                                        <NavDropdown.Item
                                                            as={Link}
                                                            to={submenuitem.link}
                                                            onClick={(expandedMenu) => onClick(!expandedMenu)}
                                                        >
                                                            {/* Third Level menu item */}
                                                            {submenuitem.menuitem}
                                                        </NavDropdown.Item>
                                                    )}
                                                </Fragment>
                                            );
                                        }
                                    })}
                                </NavDropdown>
                            );
                        }
                    }
                })}
            </NavDropdown>
        );
    };
    return (
        <Fragment>
            {/* There is only one setting between NavbarDesktop and NavbarMobile component i.e. show property used with <NavDropdown show> tag */}
            {isDesktop ? <NavbarDesktop /> : <NavbarMobile />}
        </Fragment>
    );
};

// mega menu

const MegaMenu = () => {
    const isDesktop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    const MegaMenuDesktop = () => {
        return (
            <div className="nav-item dropdown dropdown-fullwidth">
                <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Collections
                </Link>
                <div className="dropdown-menu dropdown-menu-md">
                    <div className="px-4 pt-2 pb-2">
                        <Row>
                            {/* <Col xs={12}>
								<div className="lh-1 mb-5">
									<h3 className="mb-1">Earn a Degree</h3>
									<p>
										Breakthrough pricing on 100% online degrees designed to fit
										into your life.
									</p>
								</div>
							</Col> */}
                            {NavbarMegaMenuRoutes.map((item, index) => {
                                return (
                                    <Col lg={4} xs={12} key={index}>
                                        <div className="border-bottom pb-2 mb-3">
                                            <h5 className="mb-0">{item.menuitem}</h5>
                                        </div>
                                        {item.children.map((subitem, subindex) => {
                                            return subitem.button ? (
                                                <div className="mt-4" key={subindex}>
                                                    <Link
                                                        to={subitem.link}
                                                        className="btn btn-outline-primary btn-sm"
                                                    >
                                                        {subitem.menuitem}
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div className="" key={subindex}>
                                                    <Link to={subitem.link}>
                                                        <div className="d-flex mb-3">
                                                            <img src={subitem.image} height={50} alt="" />
                                                            <div className="ms-2">
                                                                <small className="text-body">
                                                                    {subitem.subtitle}
                                                                </small>
                                                                <h6 className="mb-0">{subitem.menuitem}</h6>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            </div>
        );
    };

    const MegaMenuMobile = () => {
        return (
            <NavDropdown
                title="Collections"
                className="dropdown-fullwidth"
                id="basic-nav-dropdown"
            >
                <NavDropdown.Item as="div" className="py-2 px-3">
                    <Row>
                        {/* <Col lg={12} md={12} xs={12} className="lh-1 mb-1">
							<h3 className="mb-1">Earn a Degree</h3>
							<p className="text-wrap">
								Breakthrough pricing on 100% online degrees designed to fit into
								your life.
							</p>
						</Col> */}
                        {NavbarMegaMenuRoutes.map((item, index) => {
                            return (
                                <Col lg={4} xs={12} key={index}>
                                    <div className="border-bottom pb-2 mb-3">
                                        <h5 className="mb-0">{item.menuitem}</h5>
                                    </div>
                                    {item.children.map((subitem, subindex) => {
                                        return subitem.button ? (
                                            <div className="mt-4" key={subindex}>
                                                <Link
                                                    to={subitem.link}
                                                    className="btn btn-outline-primary btn-sm mb-2"
                                                >
                                                    {subitem.menuitem}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="" key={subindex}>
                                                <Link to={subitem.link}>
                                                    <div className="d-flex mb-3">
                                                        <img src={subitem.image} height={50} alt="" />
                                                        <div className="ms-2">
                                                            <small className="text-body">
                                                                {subitem.subtitle}
                                                            </small>
                                                            <h6 className="mb-0">{subitem.menuitem}</h6>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </Col>
                            );
                        })}
                    </Row>
                </NavDropdown.Item>
            </NavDropdown>
        );
    };

    return (
        <Fragment>{isDesktop ? <MegaMenuDesktop /> : <MegaMenuMobile />}</Fragment>
    );
};

// mega menu routes data
const NavbarMegaMenuRoutes = [
    {
        id: uuid(),
        menuitem: 'Gold',
        children: [
            {
                id: uuid(),
                menuitem: 'Rings',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Pendant',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Necklaces',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Bracelets and Bangles',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Mangalsutra',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                button: false,
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Gold Cufflinks',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Gold Chain',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Gold Nath',
                subtitle: '24 Carrot Gold',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Gold-Studspng__1468486032268477368.webp",
                button: false,
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'View All Gold',
                subtitle: '24 Carrot Gold',
                button: true,
                link: '#'
            }
        ]
    },
    {
        id: uuid(),
        menuitem: 'Silver',
        children: [
            {
                id: uuid(),
                menuitem: 'Google Data Analytics',
                subtitle: "Nature's Delight Silver Anklet",
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Painjanpng__51177356160364219.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'IBM Data Science',
                subtitle: "Nature's Delight Silver Anklet",
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Painjanpng__51177356160364219.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Machine Leaning for Analytics',
                subtitle: "Nature's Delight Silver Anklet",
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Painjanpng__51177356160364219.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'TensorFlow Developer Certificate',
                subtitle: "Nature's Delight Silver Anklet",
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Painjanpng__51177356160364219.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Meta Marketing Analytics',
                subtitle: "Nature's Delight Silver Anklet",
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Painjanpng__51177356160364219.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'View all Silver',
                subtitle: "Nature's Delight Silver Anklet",
                button: true,
                link: '#'
            }
        ]
    },
    {
        id: uuid(),
        menuitem: 'Diamond',
        children: [
            {
                id: uuid(),
                menuitem: 'Rings',
                subtitle: "Zeus Diamond Cufflinks",
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
                link: '#'
            },
            {
                id: uuid(),
                menuitem: 'Pendant',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'Necklaces',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'Bracelets and Bangles',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'Mangalsutra',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'Cufflinks',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'Chain',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'Nath',
                subtitle: "Zeus Diamond Cufflinks",
                link: '#',
                image: "https://d1put4x3vjlh9s.cloudfront.net/public/uploads/menus/menu-items/Diamond-Casual--ring-png__19895897311004610275.webp",
            },
            {
                id: uuid(),
                menuitem: 'View All Diamonds',
                button: true,
                link: '#',
            }
        ]
    },

];


// footer

// const RistelFooterWithLinks = () => {
//     return (
//         <Fragment>
//             <footer className="pt-lg-10 pt-5 footer bg-white">
//                 <Container>
//                     <Row>
//                         <Col lg={4} md={6} sm={12}>
//                             {/* about company  */}
//                             <div className="mb-4">
//                                 <Link to="/">
//                                     <Image src={FooterLogo} alt="" className="logo-inverse" />
//                                 </Link>
//                                 <div className="mt-4">
//                                     <p>
//                                         we specialize in exquisite diamond, gold, and silver jewelry. With a passion for craftsmanship and timeless elegance, our collection offers the perfect blend of luxury and style for every occasion. Discover the sparkle that speaks to you!
//                                     </p>
//                                     {/* social media */}
//                                     <div className="fs-4 mt-4">
//                                         <Link to="#" className="mdi mdi-facebook text-muted me-2">
//                                             <Icon path={mdiFacebook} size={0.7} />
//                                         </Link>
//                                         <Link to="#" className="mdi mdi-twitter text-muted me-2">
//                                             <Icon path={mdiTwitter} size={0.7} />
//                                         </Link>
//                                         <Link to="#" className="mdi mdi-instagram text-muted ">
//                                             <Icon path={mdiInstagram} size={0.7} />
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Col>
//                         <Col lg={{ span: 2, offset: 1 }} md={3} sm={6}>
//                             <div className="mb-4">
//                                 {/* list */}
//                                 <h3 className="fw-bold mb-3">Company</h3>
//                                 <ListGroup
//                                     as="ul"
//                                     bsPrefix="list-unstyled"
//                                     className="nav nav-footer flex-column nav-x-0"
//                                 >
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             About
//                                         </Link>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             Pricing
//                                         </Link>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             Blog
//                                         </Link>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             Careers
//                                         </Link>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             Contact
//                                         </Link>
//                                     </ListGroup.Item>
//                                 </ListGroup>
//                             </div>
//                         </Col>
//                         <Col lg={2} md={3} sm={6}>
//                             <div className="mb-4">
//                                 {/* list  */}
//                                 <h3 className="fw-bold mb-3">Support</h3>
//                                 <ListGroup
//                                     as="ul"
//                                     bsPrefix="list-unstyled"
//                                     className="nav nav-footer flex-column nav-x-0"
//                                 >
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             Help and Support
//                                         </Link>
//                                     </ListGroup.Item>

//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             Get the app
//                                         </Link>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item as="li" bsPrefix=" ">
//                                         <Link to="#" className="nav-link">
//                                             FAQ’s
//                                         </Link>
//                                     </ListGroup.Item>

//                                 </ListGroup>
//                             </div>
//                         </Col>
//                         <Col lg={3} md={12} sm={12}>
//                             {/* contact info */}
//                             <div className="mb-4">
//                                 <h3 className="fw-bold mb-3">Get in touch</h3>
//                                 <p>147,Golden City Center,
//                                     Eldora Building,Near Prozone Mall,
//                                     Aurangabad,Maharashtra,</p>
//                                 <p className="mb-1">
//                                     Email: <Link to="#">info@risteltechnologies.com</Link>
//                                 </p>
//                                 <p>
//                                     Phone:{' '}
//                                     <span className="text-dark fw-semi-bold">
//                                         +91 73 04 7 999 71
//                                     </span>
//                                 </p>
//                                 <div className="d-flex">
//                                     <Link to="#">
//                                         <img src={AppStore} alt="" className="img-fluid" />
//                                     </Link>
//                                     <Link to="#" className="ms-2">
//                                         <img src={PlayStore} alt="" className="img-fluid" />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row className="align-items-center g-0 border-top py-2 mt-6">
//                         {/* Desc  */}
//                         <Col lg={4} md={5} sm={12}>
//                             <span>© 2024 Ristel Jewellers, Inc. All Rights Reserved</span>
//                         </Col>
//                         {/*  Links  */}
//                         <Col
//                             lg={8}
//                             md={7}
//                             sm={12}
//                             className="d-md-flex justify-content-end"
//                         >
//                             <nav className="nav nav-footer">
//                                 <Link className="nav-link ps-0" to="#">
//                                     Privacy Policy
//                                 </Link>
//                                 <Link className="nav-link px-2 px-md-3" to="#">
//                                     Cookie Notice{' '}
//                                 </Link>

//                                 <Link className="nav-link" to="/tnc">
//                                     Terms of Use
//                                 </Link>
//                             </nav>
//                         </Col>
//                     </Row>
//                 </Container>
//             </footer>
//         </Fragment>
//     );
// }
export default PublicLayout