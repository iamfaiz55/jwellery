// import { Fragment } from "react";
// import { Accordion, Badge, Card } from "react-bootstrap";
// import { useMediaQuery } from "react-responsive";
// import { Link, useLocation } from "react-router-dom";
// import SimpleBar from "simplebar-react";
// import "./user.css"; // Include custom styles here
// import { useSelector } from "react-redux";

// const UserSidebar = (props) => {
//     const location = useLocation();
//     const isMobile = useMediaQuery({ maxWidth: 767 });
//     const { user } = useSelector(state => state.user)
//     // User data (example: dynamically fetch from props or API)
//     // const user && user = {
//     //     name: "John Doe",
//     //     profileImage: "https://via.placeholder.com/100", // Replace with actual profile image URL
//     // };
//     {/* <Route path="social-profile" element={<SocialProfiles />} />
// 				<Route path="security" element={<Security />} />
// 				<Route path="invoice" element={<invoice />} />
// 				<Route path="delete-profile" element={<DeleteProfile />} />
// 				<Route path="all-orders" element={<OrderHistory />} /> */}
//     const userMenu = [
//         { name: 'Poofile ', link: '/user', icon: 'user' },
//         { name: 'All Orders', link: '/user/all-orders', icon: 'list' },
//         { name: 'Address', link: '/user/address', icon: 'map-pin' },
//         { name: 'SocialProfiles', link: '/user/social-profile', icon: 'user' },
//         { name: 'Security', link: '/user/security', icon: 'credit-card' },
//         { name: 'Invoice', link: '/user/invoice', icon: 'eye' },
//         { name: 'DeleteProfile', link: '/user/delete-profile', icon: 'tag' },
//         // { name: 'Ratings', link: '/user/ratings', icon: 'star' },
//         // { name: 'Logout', link: '/logout', icon: 'log-out' },




//         // { name: 'Profile', link: '/user/profile', icon: 'user' },
//         // { name: 'Saved Cards', link: '/user/cards', icon: 'credit-card' },
//         // { name: 'My Watchlist', link: '/user/watchlist', icon: 'eye' },
//         // { name: 'Coupons', link: '/user/coupons', icon: 'tag' },
//         // { name: 'Ratings', link: '/user/ratings', icon: 'star' },
//         // { name: 'Logout', link: '/logout', icon: 'log-out' },
//     ];

//     const generateLink = (item) => {
//         return (
//             <Link
//                 className={`nav-link ${location.pathname === item.link ? 'active' : ''}`}
//                 to={item.link}
//                 onClick={() => (isMobile ? props.onClick(!props.showMenu) : props.showMenu)}
//             >
//                 <i className={`nav-icon fe fe-${item.icon} me-2`}></i>
//                 {item.name}
//                 {item.badge && (
//                     <Badge
//                         className="ms-1"
//                         bg={item.badgecolor ? item.badgecolor : 'primary'}
//                     >
//                         {item.badge}
//                     </Badge>
//                 )}
//             </Link>
//         );
//     };

//     return (
//         <Fragment>
//             <SimpleBar style={{ maxHeight: '100vh', padding: 20 }}>
//                 {/* User Profile Section */}
//                 <div className="user-sidebar-header text-center p-4">
//                     <img
//                         src={user && user.image}
//                         alt="User Profile"
//                         className="rounded-circle mb-2 shadow-sm"
//                         style={{ width: '90px', height: '90px', objectFit: 'cover' }}
//                     />
//                     <h6 className="mb-0">{user && user.name}</h6>
//                 </div>

//                 {/* User Menu */}
//                 <Accordion as="ul" className="navbar-nav flex-column user-sidebar-menu">
//                     {userMenu.map((menu, index) => (
//                         <Card bsPrefix="nav-item" key={index} className="user-sidebar-item">
//                             {generateLink(menu)}
//                         </Card>
//                     ))}
//                 </Accordion>
//             </SimpleBar>
//         </Fragment>
//     );
// };

// export default UserSidebar;
import { Fragment } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "./user.css"; // Sidebar-specific styles
import { useSelector } from "react-redux";

const UserSidebar = (props) => {
    const location = useLocation();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { user } = useSelector(state => state.user);

    // Sidebar menu structure
    const sidebarMenu = [
        {
            category: "Account Settings",
            items: [
                { name: "Profile", link: "/user", icon: "user" },
                { name: "Address", link: "/user/address", icon: "map-pin" },
                // { name: "Social Profiles", link: "/user/social-profile", icon: "user" },
                // { name: "Security", link: "/user/security", icon: "lock" },
                { name: "Delete Profile", link: "/user/delete-profile", icon: "trash" },
            ],
        },
        {
            category: "Orders",
            items: [
                { name: "All Orders", link: "/user/all-orders", icon: "list" },
                // { name: "Invoice", link: "/user/invoice", icon: "file" },
            ],
        },
        {
            category: "My Stuff",
            items: [
                { name: "Coupons", link: "/user/coupons", icon: "tag" },
                { name: "Watchlist", link: "/user/watchlist", icon: "eye" },
            ],
        },
    ];

    // Generate menu links
    const generateMenuLinks = (items) => {
        return items.map((item, index) => (
            <Card bsPrefix="nav-item" key={index} className="user-sidebar-item">
                <Link
                    className={`nav-link ${location.pathname === item.link ? "active" : ""}`}
                    to={item.link}
                    onClick={() => (isMobile ? props.onClick(!props.showMenu) : props.showMenu)}
                >
                    <i className={`nav-icon fe fe-${item.icon} me-2`}></i>
                    {item.name}
                </Link>
            </Card>
        ));
    };

    return (
        <Fragment>
            <SimpleBar style={{ maxHeight: "100vh", padding: 20 }}>
                {/* User Profile Section */}
                <div className="user-sidebar-header text-center p-4">
                    <img
                        src={user?.image || "https://via.placeholder.com/90"}
                        alt="User Profile"
                        className="rounded-circle mb-2 shadow-sm"
                        style={{ width: "90px", height: "90px", objectFit: "cover" }}
                    />
                    <h6 className="mb-0">{user?.name || "Guest User"}</h6>
                </div>

                {/* Sidebar Menu */}
                {sidebarMenu.map((menu, index) => (
                    <Accordion as="ul" className="navbar-nav flex-column user-sidebar-menu" key={index}>
                        <h6 className="text-muted ps-3 mt-3">{menu.category}</h6>
                        {generateMenuLinks(menu.items)}
                    </Accordion>
                ))}
            </SimpleBar>
        </Fragment>
    );
};

export default UserSidebar;
