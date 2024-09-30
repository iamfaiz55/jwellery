import React, { createContext, useContext, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import Home from './components/Home';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import UserRegister from './user/UserRegister';
import UserLogin from './user/UserLogin';
import AdminProtected from './share/AdminProtected';
import UserProtected from './share/UserProtected';
import Details from './components/Details';
import Profile from './user/Profile';
import CheckOut from './components/checkOut';
import Cart from './components/Cart';
import CartCheckOut from './components/CartCheckOut';
import PaymentPage from './components/PaymentPage';
import AllOrders from './user/AllOrders';
import AdminAllOrders from './admin/AdminAllOrders';
import AllUsers from './admin/AllUsers';
import AddCarousel from './admin/AddCarousel';
import About from './admin/About';
import OurMission from './admin/OurMission';
import Footer from './components/Footer';
import Vision from './admin/Vision';
import Team from './admin/Team';
import Liked from './components/Liked';
import Categories from './admin/Categories';
import Contact from './admin/Contact';
import GetContacts from './admin/GetContacts';
import PaymentMethod from './admin/PaymentMethod';
import CompanyAddress from './admin/CompanyAddress';
import AdminScrollCards from './admin/AdminScrollCards';
import Navmenu from './admin/Navmenu';
import AdminLayout from './admin/AdminLayout';
import UserNavbar from './user/UserNAvbar';
import AdminAddImages from './admin/AdminAddImages';
// import AdminLayout from './components/AdminLayout'; // Import the new layout component

export const CartContext = createContext();
export const filterContext = createContext();
export const sectionContext = createContext();
export const selectedProductContext = createContext();
export const useCart = () => useContext(CartContext);
export const useSection = () => useContext(sectionContext);
export const usefilter = () => useContext(filterContext);
export const useProduct = () => useContext(selectedProductContext);

const App = () => {
  const [selectedProd, setselectedProd] = useState()
  const [selectedType, setSelectedType] = useState();
  const [currentSection, setCurrentSection] = useState()
  const [cartData, setCartData] = useState(() => {
    const savedCartData = localStorage.getItem('cartData');
    return savedCartData ? JSON.parse(savedCartData) : { cartItems: [], subtotal: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  return (
    <filterContext.Provider value={{ selectedType, setSelectedType }}>
      <sectionContext.Provider value={{ setCurrentSection, currentSection }}>
        <selectedProductContext.Provider value={{ selectedProd, setselectedProd }}>
          <CartContext.Provider value={{ cartData, setCartData }}>
            <Toaster richColors position="top-right" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<><UserNavbar /><Home /></>} />

                <Route path="admin/*" element={<AdminLayout />}>
                  <Route path="register" element={<AdminRegister />} />
                  <Route path="login" element={<AdminLogin />} />
                  <Route path="categories" element={<AdminProtected compo={<Categories />} />} />
                  <Route path="dashboard" element={<AdminProtected compo={<Dashboard />} />} />
                  <Route path="get-contacts" element={<AdminProtected compo={<GetContacts />} />} />
                  <Route path="addsImage" element={<AdminProtected compo={<AdminAddImages />} />} />
                  <Route path="allUsers" element={<AdminProtected compo={<AllUsers />} />} />
                  <Route path="admin-scroll-card" element={<AdminProtected compo={<AdminScrollCards />} />} />
                  <Route path="navmenu" element={<AdminProtected compo={<Navmenu />} />} />
                  <Route path="addresses" element={<AdminProtected compo={<CompanyAddress />} />} />
                  <Route path="paymentMethod" element={<AdminProtected compo={<PaymentMethod />} />} />
                  <Route path="addCarousel" element={<AdminProtected compo={<AddCarousel />} />} />
                  <Route path="allOrders" element={<AdminProtected compo={<AdminAllOrders />} />} />
                </Route>

                <Route path="user/*" element={
                  <>
                    <UserNavbar />
                    <Routes>
                      <Route path="register" element={<UserRegister />} />
                      <Route path="login" element={<UserLogin />} />
                      <Route path="about" element={<About />} />
                      <Route path="mission" element={<OurMission />} />
                      <Route path="vision" element={<Vision />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="team" element={<Team />} />
                      <Route path="cart" element={<><UserProtected compo={<Cart />} /></>} />
                      <Route path="cartCheckout" element={<><UserProtected compo={<CartCheckOut />} /></>} />
                      <Route path="liked" element={<><UserProtected compo={<Liked />} /></>} />
                      <Route path="allOrders" element={<><UserProtected compo={<AllOrders />} /></>} />
                      <Route path="checkout/:id" element={<CheckOut />} />
                      <Route path="profile" element={<UserProtected compo={<Profile />} />} />
                      <Route path="payment" element={<UserProtected compo={<PaymentPage />} />} />
                    </Routes>
                  </>
                } />

                <Route path="/details/:id" element={<><UserNavbar /><Details /></>} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
              </Routes>
            </BrowserRouter>
            <Footer />
          </CartContext.Provider>
        </selectedProductContext.Provider>
      </sectionContext.Provider>
    </filterContext.Provider>
  );
};

export default App;
