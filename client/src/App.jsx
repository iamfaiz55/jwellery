import React, { createContext, useContext, useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/Dashboard';
import Home from './components/Home';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminNavbar from './admin/AdminNavbar';
import UserRegister from './user/UserRegister';
import UserLogin from './user/UserLogin';
import AdminProtected from './share/AdminProtected';
import UserProtected from './share/UserProtected';
import Details from './components/Details';
import Profile from './user/Profile';
import CheckOut from './components/checkOut';
import UserNAvbar from './user/UserNAvbar';

import Cart from './components/Cart';
import CartCheckOut from './components/CartCheckOut';
import PaymentPage from './components/PaymentPage';
import AllOrders from './user/AllOrders';
import AdminAllOrders from './admin/AdminAllOrders';
// import AllUSers from './admin/AllUSers';
import AllUsers from './admin/AllUSers';
import AddCarousel from './admin/AddCarousel';
// import Cart from '../../server/models/Cart';



export const CartContext = createContext();
export const filterContext = createContext();
export const useCart = () => useContext(CartContext);
export const usefilter = () => useContext(filterContext);
const App = () => {
  const [selectedType, setSelectedType] = useState();
  const [cartData, setCartData] = useState(() => {

    const savedCartData = localStorage.getItem('cartData');
    return savedCartData ? JSON.parse(savedCartData) : { cartItems: [], subtotal: 0 };
  });

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);
  return (
    <filterContext.Provider value={{ selectedType, setSelectedType }}>
      <CartContext.Provider value={{ cartData, setCartData }}>
        <Toaster richColors position="top-center" />
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<>  <UserNAvbar /><Home /></>} />


            <Route
              path="admin/*"
              element={
                <>
                  <AdminNavbar />
                  <Routes>
                    <Route path="register" element={<AdminRegister />} />
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="dashboard" element={<AdminProtected compo={<Dashboard />} />} />
                    <Route path="allUsers" element={<AdminProtected compo={<AllUsers />} />} />
                    <Route path="addCarousel" element={<AdminProtected compo={<AddCarousel />} />} />
                    <Route path="allOrders" element={<AdminProtected compo={<AdminAllOrders />} />} />
                  </Routes>
                </>
              }
            />

            <Route
              path="user/*"
              element={
                <>
                  <UserNAvbar />
                  <Routes>
                    <Route path="register" element={<UserRegister />} />
                    <Route path="login" element={<UserLogin />} />
                    <Route path="cart" element={<><UserProtected compo={<Cart />} /></>} />
                    <Route path="cartCheckout" element={<><UserProtected compo={<CartCheckOut />} /></>} />
                    <Route path="allOrders" element={<><UserProtected compo={<AllOrders />} /></>} />
                    <Route path="checkout/:id" element={<CheckOut />} />
                    <Route path="profile" element={<UserProtected compo={<Profile />} />} />
                    <Route path="payment" element={<UserProtected compo={<PaymentPage />} />} />
                  </Routes>
                </>
              }
            />
            <Route
              path="/details/:id"
              element={
                <>
                  <UserNAvbar />
                  <Details />
                </>
              }
            />

            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    </filterContext.Provider>
  );
};



export default App;
