import { Route, Routes, Navigate } from 'react-router-dom';
import './../assets/scss/theme.scss';
import Home from '../ristel/pages/Home';
import Login from '../ristel/pages/Login';
import Register from '../ristel/pages/Register';
import TnC from '../ristel/pages/TnC';
import FilterJewellery from '../ristel/pages/FilterJewellery';
import ProductDetails from '../ristel/pages/ProductDetails';
import Cart from '../ristel/pages/Cart';
import CartProvider from '../context/providers/CartProvider';
import RistelCheckout from '../ristel/pages/RistelCheckout';
import AdminLayout from '../ristel/admin/components/AdminLayout';
import PublicLayout from '../ristel/components/PublicLayout';
import Dashboard from '../ristel/admin/pages/Dashboard';
import AddProduct from '../ristel/admin/pages/products/AddProduct';
import Details from '../ristel/admin/pages/products/Details';
import Draft from '../ristel/admin/pages/products/Draft';
import UserManagement from '../ristel/admin/pages/users/Management';
import Address from '../ristel/admin/pages/users/Address';
import Reviews from '../ristel/admin/pages/users/Reviews';
import ActiveInactive from '../ristel/admin/pages/users/ActiveInactive';
import Online from '../ristel/admin/pages/users/Online';
import Slider from '../ristel/admin/pages/cms/Slider';
import CmsAddress from '../ristel/admin/pages/cms/CmsAddress';
import Logo from '../ristel/admin/pages/cms/Logo';
import CmsReviews from '../ristel/admin/pages/cms/CmsReviews';
import About from '../ristel/admin/pages/cms/About';
import Contact from '../ristel/admin/pages/cms/Contact';
import PrivacyPolicy from '../ristel/admin/pages/cms/PrivacyPolicy';
import Tnc from '../ristel/admin/pages/cms/Tnc';
import Faq from '../ristel/admin/pages/cms/Faq';
import ActiveCart from '../ristel/admin/pages/orders/ActiveCart';
import CheckoutOrders from '../ristel/admin/pages/orders/CheckoutOrders';
import OrderOverview from '../ristel/admin/pages/orders/OrderOverview';
import AddEmployee from '../ristel/admin/pages/employee/AddEmployee';
import EmployeeDetails from '../ristel/admin/pages/employee/EmployeeDetails';
import Tasks from '../ristel/admin/pages/Tasks';
import Calendar from '../ristel/admin/pages/Calendar';
import PaymentSuccess from '../ristel/pages/Success';
import NotFound from '../ristel/pages/NotFound';
import AdminLogin from '../ristel/admin/pages/AdminLogin';
import AdminProtected from '../ristel/share/AdminProtected';
import ProductForm from '../ristel/admin/pages/products/ProductForm';
import ProductSettings from '../ristel/admin/pages/general/ProductSettings';
import { createContext, useContext, useEffect, useState } from 'react';
import OrderHistory from '../ristel/user/OrderHistory';
import AdminDashboard from '../ristel/admin/AdminDashboard/AdminDashboard';
import Gallery from '../ristel/admin/pages/users/Gallery';
import Schedule from '../ristel/admin/pages/products/Schedule';
import CustomerProtected from '../ristel/share/UserProtected';
import UserLayout from '../ristel/user/components/UserLayout';
// import ProfilePrivacy from '../ristel/user/Profile';
// import BillingInfo from '../ristel/user/AddressInfo';
// import SocialProfiles from '../ristel/user/StudentSocialProfiles';
// import Security from '../ristel/user/Security';
// import Invoice from '../ristel/user/Invoice';
import DeleteProfile from '../ristel/user/DeleteProfile';
import AddressInfo from '../ristel/user/AddressInfo';
import Profile from '../ristel/user/Profile';
import Watchlist from '../ristel/user/Watchlist';
import Coupon from '../ristel/user/Coupon';


export const CartContext = createContext();
export const useCart = () => useContext(CartContext);
const AllRoutes = () => {
	const [cartData, setCartData] = useState(() => {
		const savedCartData = localStorage.getItem('cartData');
		return savedCartData ? JSON.parse(savedCartData) : { cartItems: [], subtotal: 0 };
	});

	useEffect(() => {
		localStorage.setItem('cartData', JSON.stringify(cartData));
	}, [cartData]);
	return <CartContext.Provider value={{ cartData, setCartData }}>
		<Routes>
			<Route path='/' element={<PublicLayout />}>
				<Route index element={<Home />} />
				<Route path="filter" element={<FilterJewellery />} />
				<Route path="product-details/:id" element={<ProductDetails />} />
				<Route path="success" element={<PaymentSuccess />} />

				<Route path="checkout" element={<CartProvider>
					<RistelCheckout />
				</CartProvider>} />
				<Route path="cart" element={<CartProvider>
					<Cart />
				</CartProvider>} />
			</Route>
			<Route path="tnc" element={<TnC />} />
			<Route path="/login" element={<Login />} />
			<Route path="/admin-login" element={<AdminLogin />} />
			<Route path="/register" element={<Register />} />

			<Route path='/admin' element={<AdminProtected compo={<AdminLayout />} />}>
				<Route index element={<Dashboard />} />
				<Route path="product/add" element={<AddProduct />} />
				<Route path="product/schedule" element={<Schedule />} />
				<Route path="product/add-form" element={<ProductForm />} />
				<Route path="product/details" element={<Details />} />
				<Route path="product/draft" element={<Draft />} />

				<Route path="user/management" element={<UserManagement />} />
				<Route path="user/address" element={<Address />} />
				<Route path="user/reviews" element={<Reviews />} />
				<Route path="user/active" element={<ActiveInactive type="active" />} />
				<Route path="user/inactive" element={<ActiveInactive type="inactive" />} />
				<Route path="user/online" element={<Online />} />
				<Route path="cms/slider" element={<Slider />} />
				<Route path="cms/gallery" element={<Gallery />} />
				<Route path="cms/address" element={<CmsAddress />} />
				<Route path="cms/logo" element={<Logo />} />
				<Route path="cms/reviews" element={<CmsReviews />} />
				<Route path="cms/about" element={<About />} />
				<Route path="cms/contact" element={<Contact />} />
				<Route path="cms/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="cms/terms-conditions" element={<Tnc />} />
				<Route path="cms/faq" element={<Faq />} />

				<Route path="order/cart" element={<ActiveCart />} />
				<Route path="order/checkout" element={<CheckoutOrders />} />
				<Route path="dashboard" element={<AdminDashboard />} />
				<Route path="order/overview" element={<OrderOverview />} />

				<Route path="employee/add" element={<AddEmployee />} />
				<Route path="employee/details" element={<EmployeeDetails />} />

				<Route path="task" element={<Tasks />} />
				<Route path="calendar" element={<Calendar />} />
				<Route path="general-product-settings" element={<ProductSettings />} />
			</Route>
			<Route path='/user' element={<CustomerProtected compo={<UserLayout />} />}>
				<Route index element={<Profile />} />
				<Route path="address" element={<AddressInfo />} />
				<Route path="watchlist" element={<Watchlist />} />
				<Route path="coupons" element={<Coupon />} />
				{/* <Route path="social-profile" element={<SocialProfiles />} /> */}
				{/* <Route path="security" element={<Security />} /> */}
				{/* <Route path="invoice" element={<Invoice />} /> */}
				<Route path="delete-profile" element={<DeleteProfile />} />
				<Route path="all-orders" element={<OrderHistory />} />
				{/* <Route path="product/add" element={<AddProduct />} />
				<Route path="product/schedule" element={<Schedule />} />
				<Route path="product/add-form" element={<ProductForm />} />
				<Route path="product/details" element={<Details />} />
				<Route path="product/draft" element={<Draft />} />

				<Route path="user/management" element={<UserManagement />} />
				<Route path="user/address" element={<Address />} />
				<Route path="user/reviews" element={<Reviews />} />
				<Route path="user/active" element={<ActiveInactive type="active" />} />
				<Route path="user/inactive" element={<ActiveInactive type="inactive" />} />
				<Route path="user/online" element={<Online />} />
				<Route path="cms/slider" element={<Slider />} />
				<Route path="cms/gallery" element={<Gallery />} />
				<Route path="cms/address" element={<CmsAddress />} />
				<Route path="cms/logo" element={<Logo />} />
				<Route path="cms/reviews" element={<CmsReviews />} />
				<Route path="cms/about" element={<About />} />
				<Route path="cms/contact" element={<Contact />} />
				<Route path="cms/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="cms/terms-conditions" element={<Tnc />} />
				<Route path="cms/faq" element={<Faq />} />

				<Route path="order/cart" element={<ActiveCart />} />
				<Route path="order/checkout" element={<CheckoutOrders />} />
				<Route path="dashboard" element={<AdminDashboard />} />
				<Route path="order/overview" element={<OrderOverview />} />

				<Route path="employee/add" element={<AddEmployee />} />
				<Route path="employee/details" element={<EmployeeDetails />} />

				<Route path="task" element={<Tasks />} />
				<Route path="calendar" element={<Calendar />} />
				<Route path="general-product-settings" element={<ProductSettings />} /> */}
			</Route>

			<Route
				path="*"
				element={<NotFound />}
			/>
		</Routes>
	</CartContext.Provider>

};

export default AllRoutes
